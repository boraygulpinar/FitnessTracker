using FitnessTracker.Server.Data;
using FitnessTracker.Server.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExerciseTemplatesController : ControllerBase
    {
        private readonly FitnessTrackerContext _context;

        public ExerciseTemplatesController(FitnessTrackerContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExerciseTemplate>>> GetExercises()
        {
            return await _context.ExerciseTemplates.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<ExerciseTemplate>> CreateExercise(ExerciseTemplateCreateDto exerciseDto)
        {
            var newExercise = new ExerciseTemplate
            {
                Name = exerciseDto.Name
            };

            _context.ExerciseTemplates.Add(newExercise);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetExercises), new { id = newExercise.Id }, newExercise);
        }
    }
}