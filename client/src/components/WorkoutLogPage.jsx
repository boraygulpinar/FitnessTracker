import NewWorkoutForm from "./NewWorkoutForm";
import WorkoutList from "./WorkoutList";

const WorkoutLogPage = ({
  templates,
  workouts,
  loading,
  error,
  onSave,
  onEdit,
  onDelete,
  workoutToEdit,
  onCancelEdit,
  formRef,
}) => {
  return (
    <>
      <div ref={formRef}>
        <NewWorkoutForm
          templates={templates}
          onSave={onSave}
          workoutToEdit={workoutToEdit}
          onCancelEdit={onCancelEdit}
        />
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Geçmiş Antrenmanlar
        </h2>
        <WorkoutList
          workouts={workouts}
          loading={loading}
          error={error}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </div>
    </>
  );
};

export default WorkoutLogPage;
