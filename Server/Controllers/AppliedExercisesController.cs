using FitnessTracker.Server.Data;
using FitnessTracker.Server.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace FitnessTracker.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppliedExercisesController : ControllerBase
    {
        private readonly FitnessTrackerContext _context;

        public AppliedExercisesController(FitnessTrackerContext context)
        {
            _context = context;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutAppliedExercise(int id, AppliedExerciseCreateDto appliedExerciseDto)
        {
            var exerciseToUpdate = await _context.AppliedExercises.FindAsync(id);

            if (exerciseToUpdate == null)
            {
                return NotFound();
            }

            exerciseToUpdate.ExerciseTemplateId = appliedExerciseDto.ExerciseTemplateId;
            exerciseToUpdate.Sets = appliedExerciseDto.Sets;
            exerciseToUpdate.Reps = appliedExerciseDto.Reps;
            exerciseToUpdate.Weight = appliedExerciseDto.Weight;
            exerciseToUpdate.Notes = appliedExerciseDto.Notes;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteAppliedExercise(int id)
        {
            var exerciseToDelete = await _context.AppliedExercises.FindAsync(id);

            if (exerciseToDelete == null)
            {
                return NotFound();
            }

            _context.AppliedExercises.Remove(exerciseToDelete);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}