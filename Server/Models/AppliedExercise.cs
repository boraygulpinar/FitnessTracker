public class AppliedExercise
{
    public int Id { get; set; }

    public int WorkoutSessionId { get; set; }
    public WorkoutSession WorkoutSession { get; set; }

    public int ExerciseTemplateId { get; set; }
    public ExerciseTemplate ExerciseTemplate { get; set; }

    public int Sets { get; set; }
    public int Reps { get; set; }
    public decimal Weight { get; set; }
    public string? Notes { get; set; }
}