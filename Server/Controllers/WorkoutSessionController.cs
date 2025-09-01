using FitnessTracker.Server.Data;
using FitnessTracker.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.Server.Controllers
{
    [ApiController]
    [Route("api/workoutsessions")]
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
            if (workoutDto == null || workoutDto.AppliedExercises.Count == 0)
            {
                return BadRequest("Antrenman verisi boş olamaz veya en az bir egzersiz içermelidir.");
            }
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
                    Notes = exerciseDto.Notes,
                };
                newWorkout.AppliedExercises.Add(appliedExercise);
            }

            _context.WorkoutSessions.Add(newWorkout);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Veritabanı güncelleme hatası: {ex.InnerException?.Message ?? ex.Message}");
            }

            return Ok(new { message = "Antrenman başarıyla kaydedildi.", id = newWorkout.Id });
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

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateWorkout(int id, WorkoutSessionCreateDto workoutDto)
        {
            var workoutToUpdate = await _context.WorkoutSessions
            .Include(w => w.AppliedExercises)
            .FirstOrDefaultAsync(w => w.Id == id);

            if (workoutToUpdate == null)
            {
                return NotFound();
            }

            workoutToUpdate.Date = workoutDto.Date;
            workoutToUpdate.Notes = workoutDto.Notes;
            workoutToUpdate.CardioDuration = workoutDto.CardioDuration;

            workoutToUpdate.AppliedExercises.Clear();
            foreach (var exerciseDto in workoutDto.AppliedExercises)
            {
                var appliedExercise = new AppliedExercise
                {
                    ExerciseTemplateId = exerciseDto.ExerciseTemplateId,
                    Sets = exerciseDto.Sets,
                    Reps = exerciseDto.Reps,
                    Weight = exerciseDto.Weight,
                    Notes = exerciseDto.Notes,
                };
                workoutToUpdate.AppliedExercises.Add(appliedExercise);
            }
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, $"Veritabanı güncelleme hatası: {ex.InnerException?.Message ?? ex.Message}");
            }

            return NoContent();
        }

    }
}