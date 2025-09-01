export const WorkoutItem = ({ workout, onEdit, onDelete }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl relative group">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-sky-400">
            {new Date(workout.date).toLocaleDateString("tr-TR", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          {workout.cardioDuration > 0 && (
            <p className="text-sm text-slate-400 mt-1">
              Kardiyo: {workout.cardioDuration} dakika
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onEdit(workout)}
            className="text-slate-500 hover:text-sky-400 transition-colors"
            title="Antrenmanı Düzenle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(workout.id)}
            className="text-slate-500 hover:text-red-500 transition-colors"
            title="Antrenmanı Sil"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <ul className="mt-4 space-y-3">
        {workout.appliedExercises.map((ex) => (
          <li
            key={ex.id}
            className="text-slate-300 border-l-2 border-slate-600 pl-4"
          >
            <span className="font-semibold text-white">
              {ex.exerciseTemplate.name}:
            </span>{" "}
            {ex.sets} set × {ex.reps} tekrar @ {ex.weight} kg
            {ex.notes && (
              <p className="text-xs text-slate-400 italic pl-2">
                - "{ex.notes}"
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
