public class WorkoutSession
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string? Notes { get; set; }
    public int? CardioDuration { get; set; }
    public ICollection<AppliedExercise> AppliedExercises { get; set; } = new List<AppliedExercise>();
}