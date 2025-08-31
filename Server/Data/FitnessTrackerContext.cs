using Microsoft.EntityFrameworkCore;

namespace FitnessTracker.Server.Data
{
    public class FitnessTrackerContext : DbContext
    {
        public FitnessTrackerContext(DbContextOptions<FitnessTrackerContext> options)
            : base(options)
        {
        }

        public DbSet<WorkoutSession> WorkoutSessions { get; set; }
        public DbSet<ExerciseTemplate> ExerciseTemplates { get; set; }
        public DbSet<AppliedExercise> AppliedExercises { get; set; }
    }
}