public class ExerciseTemplate
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ICollection<AppliedExercise> AppliedExercises { get; set; } = new List<AppliedExercise>();
}