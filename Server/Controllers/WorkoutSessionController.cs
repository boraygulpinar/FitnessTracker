using FitnessTracker.Server.Data;
using FitnessTracker.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class WorkoutSessionController : ControllerBase
    {
        private readonly FitnessTrackerContext _context;

        public WorkoutSessionController(FitnessTrackerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<WorkoutSession>>> GetWorkouts()
        {
            return await _context.WorkoutSessions
            .Include(w => w.AppliedExercises)
            .ThenInclude(we => we.ExerciseTemplate)
            .OrderByDescending(w => w.Date)
            .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<WorkoutSession>> GetWorkout(int id)
        {
            var workout = await _context.WorkoutSessions
            .Include(w => w.AppliedExercises)
            .ThenInclude(we => we.ExerciseTemplate)
            .FirstOrDefaultAsync(w => w.Id == id);

            if (workout == null)
            {
                return NotFound();
            }

            return workout;
        }

        [HttpPost]
        public async Task<ActionResult<WorkoutSession>> CreateWorkout(WorkoutSessionCreateDto workoutDto)
        {
            var newWorkout = new WorkoutSession
            {
                Date = workoutDto.Date,
                Notes = workoutDto.Notes,
                CardioDuration = workoutDto.CardioDuration
            };

            foreach (var exerciseDto in workoutDto.AppliedExercises)
            {
                var appliedExercise = new AppliedExercise
                {
                    ExerciseTemplateId = exerciseDto.ExerciseTemplateId,
                    Sets = exerciseDto.Sets,
                    Reps = exerciseDto.Reps,
                    Weight = exerciseDto.Weight,
                    Notes = exerciseDto.Notes
                };
                newWorkout.AppliedExercises.Add(appliedExercise);
            }

            _context.WorkoutSessions.Add(newWorkout);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetWorkout), new { id = newWorkout.Id }, newWorkout);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteWorkout(int id)
        {
            var workout = await _context.WorkoutSessions.FindAsync(id);
            if (workout == null)
            {
                return NotFound();
            }

            _context.WorkoutSessions.Remove(workout);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}