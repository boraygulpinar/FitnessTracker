import { useEffect, useState } from "react";

const NewWorkoutForm = ({ templates, onSave, workoutToEdit, onCancelEdit }) => {
  const initialExerciseState = {
    id: Date.now(),
    templateId: "",
    sets: "",
    reps: "",
    weight: "",
    notes: "",
  };

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [cardio, setCardio] = useState("");
  const [exercises, setExercises] = useState([initialExerciseState]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (workoutToEdit) {
      setDate(new Date(workoutToEdit.date).toISOString().split("T")[0]);
      setCardio(workoutToEdit.cardioDuration || "");
      setExercises(
        workoutToEdit.appliedExercises.map((ex) => ({
          id: ex.id,
          templateId: ex.exerciseTemplate.id,
          sets: ex.sets,
          reps: ex.reps,
          weight: ex.weight,
          notes: ex.notes || "",
        }))
      );
    } else {
      setDate(new Date().toISOString().split("T")[0]);
      setCardio("");
      setExercises([{ ...initialExerciseState, id: Date.now() }]);
    }
  }, [workoutToEdit]);

  const handleExerciseChange = (id, field, value) => {
    setExercises(
      exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex))
    );
  };

  const addExerciseRow = () => {
    setExercises([...exercises, { ...initialExerciseState, id: Date.now() }]);
  };

  const removeExerciseRow = (id) => {
    if (exercises.length > 1) {
      setExercises(exercises.filter((ex) => ex.id !== id));
    }
  };

  const isEditMode = !!workoutToEdit;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSaving) return;
    setIsSaving(true);

    const workoutData = {
      date: date,
      cardioDuration: cardio ? parseInt(cardio) : null,
      appliedExercises: exercises
        .filter((ex) => ex.templateId && ex.sets && ex.reps && ex.weight)
        .map((ex) => ({
          exerciseTemplateId: parseInt(ex.templateId),
          sets: parseInt(ex.sets),
          reps: parseInt(ex.reps),
          weight: parseFloat(ex.weight),
          notes: ex.notes,
        })),
    };

    try {
      await onSave(workoutData);
      setDate(new Date().toISOString().split("T")[0]);
      setCardio("");
      setExercises([{ ...initialExerciseState, id: Date.now() }]);
    } catch (error) {
      console.error("Form save failed", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl mb-10">
      <h2 className="text-2xl font-bold mb-6 text-white">
        {isEditMode ? "Antrenmanı Düzenle" : "Yeni Antrenman Kaydet"}
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label
              htmlFor="date"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Tarih
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="cardio"
              className="block text-sm font-medium text-slate-300 mb-1"
            >
              Kardiyo (dk)
            </label>
            <input
              type="number"
              id="cardio"
              placeholder="Örn: 30"
              value={cardio}
              onChange={(e) => setCardio(e.target.value)}
              className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-4 text-white">Egzersizler</h3>
        <div className="space-y-4">
          {exercises.map((ex) => (
            <div
              key={ex.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center"
            >
              <div className="md:col-span-3">
                <select
                  value={ex.templateId}
                  onChange={(e) =>
                    handleExerciseChange(ex.id, "templateId", e.target.value)
                  }
                  className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                >
                  <option value="">Egzersiz Seç</option>
                  {templates
                    .slice()
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <input
                  type="number"
                  placeholder="Set"
                  value={ex.sets}
                  onChange={(e) =>
                    handleExerciseChange(ex.id, "sets", e.target.value)
                  }
                  className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  type="number"
                  placeholder="Tekrar"
                  value={ex.reps}
                  onChange={(e) =>
                    handleExerciseChange(ex.id, "reps", e.target.value)
                  }
                  className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  type="number"
                  placeholder="Ağırlık"
                  value={ex.weight}
                  onChange={(e) =>
                    handleExerciseChange(ex.id, "weight", e.target.value)
                  }
                  className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <input
                  type="text"
                  placeholder="Notlar"
                  value={ex.notes}
                  onChange={(e) =>
                    handleExerciseChange(ex.id, "notes", e.target.value)
                  }
                  className="w-full bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
                />
              </div>
              <div className="md:col-span-1 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => removeExerciseRow(ex.id)}
                  className="text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                  disabled={exercises.length <= 1}
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
          ))}
        </div>
        <div className="flex items-center justify-between mt-6">
          <button
            type="button"
            onClick={addExerciseRow}
            className="flex items-center gap-2 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded-md transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Egzersiz Ekle
          </button>
          <div className="flex items-center gap-4">
            {isEditMode && (
              <button
                type="button"
                onClick={onCancelEdit}
                className="text-slate-400 hover:text-white font-bold py-2 px-6 rounded-md transition-colors"
              >
                İptal
              </button>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2 px-6 rounded-md transition-colors disabled:bg-sky-800 disabled:cursor-not-allowed"
            >
              {isSaving
                ? "Kaydediliyor..."
                : isEditMode
                ? "Değişiklikleri Kaydet"
                : "Antrenmanı Kaydet"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewWorkoutForm;
