namespace FitnessTracker.Server.DTOs
{
    public class WorkoutSessionCreateDto
    {
        public DateTime Date { get; set; }
        public string? Notes { get; set; }
        public int? CardioDuration { get; set; }
        public ICollection<AppliedExerciseCreateDto> AppliedExercises { get; set; } = new List<AppliedExerciseCreateDto>();
    }
}