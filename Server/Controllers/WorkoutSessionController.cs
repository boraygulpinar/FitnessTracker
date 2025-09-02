using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitnessTracker.Server.Data;
using FitnessTracker.Server.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using FitnessTracker.Server.DTOs;

namespace FitnessTracker.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class WorkoutSessionsController : ControllerBase
    {
        private readonly FitnessTrackerContext _context;

        public WorkoutSessionsController(FitnessTrackerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutSession>>> GetWorkoutSessions()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return await _context.WorkoutSessions
                .Where(ws => ws.ApplicationUserId == userId)
                .Include(ws => ws.AppliedExercises)
                .ThenInclude(ae => ae.ExerciseTemplate)
                .OrderByDescending(ws => ws.Date)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutSession>> GetWorkoutSession(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var workoutSession = await _context.WorkoutSessions
                .Include(ws => ws.AppliedExercises)
                .ThenInclude(ae => ae.ExerciseTemplate)
                .FirstOrDefaultAsync(ws => ws.Id == id && ws.ApplicationUserId == userId);

            if (workoutSession == null)
            {
                return NotFound();
            }

            return workoutSession;
        }
        [HttpPost]
        public async Task<ActionResult<WorkoutSession>> PostWorkoutSession(WorkoutSessionCreateDto workoutDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var workoutSession = new WorkoutSession
            {
                ApplicationUserId = userId,
                Date = workoutDto.Date,
                Notes = workoutDto.Notes,
                CardioDuration = workoutDto.CardioDuration,
                AppliedExercises = workoutDto.AppliedExercises.Select(aeDto => new AppliedExercise
                {
                    ExerciseTemplateId = aeDto.ExerciseTemplateId,
                    Sets = aeDto.Sets,
                    Reps = aeDto.Reps,
                    Weight = aeDto.Weight,
                    Notes = aeDto.Notes
                }).ToList()
            };

            _context.WorkoutSessions.Add(workoutSession);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetWorkoutSession", new { id = workoutSession.Id }, workoutSession);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkoutSession(int id, WorkoutSessionCreateDto workoutDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var existingSession = await _context.WorkoutSessions
                .Include(s => s.AppliedExercises)
                .FirstOrDefaultAsync(ws => ws.Id == id);

            if (existingSession == null)
            {
                return NotFound();
            }

            if (existingSession.ApplicationUserId != userId)
            {
                return Forbid();
            }

            existingSession.Date = workoutDto.Date;
            existingSession.Notes = workoutDto.Notes;
            existingSession.CardioDuration = workoutDto.CardioDuration;

            _context.AppliedExercises.RemoveRange(existingSession.AppliedExercises);

            existingSession.AppliedExercises = workoutDto.AppliedExercises.Select(aeDto => new AppliedExercise
            {
                ExerciseTemplateId = aeDto.ExerciseTemplateId,
                Sets = aeDto.Sets,
                Reps = aeDto.Reps,
                Weight = aeDto.Weight,
                Notes = aeDto.Notes
            }).ToList();

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkoutSessionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteWorkoutSession(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var workoutSession = await _context.WorkoutSessions.FindAsync(id);

            if (workoutSession == null)
            {
                return NotFound();
            }

            if (workoutSession.ApplicationUserId != userId)
            {
                return Forbid();
            }

            _context.WorkoutSessions.Remove(workoutSession);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool WorkoutSessionExists(int id)
        {
            return _context.WorkoutSessions.Any(e => e.Id == id);
        }
    }
}