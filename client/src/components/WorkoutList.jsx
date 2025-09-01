import { WorkoutItem } from "./WorkoutItem";

const WorkoutList = ({ workouts, loading, error, onEdit, onDelete }) => {
  if (loading) {
    return <p className="text-center text-slate-400">Yükleniyor...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (workouts.length === 0) {
    return (
      <div className="text-center text-slate-400 bg-slate-800 p-8 rounded-lg shadow-xl">
        <p>Henüz kayıtlı bir antrenman yok.</p>
        <p className="text-sm">
          Yukarıdaki formu kullanarak ilkini şimdi ekleyin!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {workouts.map((workout) => (
        <WorkoutItem
          key={workout.id}
          workout={workout}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default WorkoutList;
