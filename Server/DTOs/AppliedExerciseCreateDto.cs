namespace FitnessTracker.Server.DTOs
{
    public class AppliedExerciseCreateDto
    {
        public int ExerciseTemplateId { get; set; } // hareket
        public int Sets { get; set; }
        public int Reps { get; set; }
        public decimal Weight { get; set; }
        public string? Notes { get; set; }
    }
}