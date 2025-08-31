import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import NewWorkoutForm from "./components/NewWorkoutForm";

const API_URL = "http://localhost:5074";

function App() {
  const [templates, setTemplates] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/workoutsessions`);
      setWorkouts(response.data);
    } catch (err) {
      setError("Antrenmanlar çekilirken bir hata oluştu.");
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const templatesResponse = await axios.get(
          `${API_URL}/api/ExerciseTemplates`
        );
        setTemplates(templatesResponse.data);

        await fetchWorkouts();
      } catch (err) {
        setError("Veriler çekilirken bir hata oluştu.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSaveWorkout = async (workoutData) => {
    console.log("Kaydedilecek Antrenman Verisi:", workoutData);
    try {
      const response = await axios.post(
        "http://localhost:5074/api/workoutsessions",
        workoutData
      );
      console.log(response.data.message);
      fetchWorkouts();
    } catch (error) {
      console.error("Antrenman kaydedilirken bir hata oluştu", error);
      if (error.response) {
        console.error("Sunucu Hatası:", error.response.data);
      }
    }
  };

  const handleDeleteWorkout = async (id) => {
    if (!window.confirm("Bu antrenmanı silmek istediğinize emin misiniz?")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/api/workoutsessions/${id}`);
      setWorkouts(workouts.filter((w) => w.id !== id));
    } catch (err) {
      setError("Antrenman silinirken bir hata oluştu.");
      console.error(err);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <NewWorkoutForm templates={templates} onSave={handleSaveWorkout} />

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-white">
          Geçmiş Antrenmanlar
        </h2>
        {loading && <p className="text-center text-slate-400">Yükleniyor...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && workouts.length === 0 && (
          <div className="text-center text-slate-400 bg-slate-800 p-8 rounded-lg shadow-xl">
            <p>Henüz kayıtlı bir antrenman yok.</p>
            <p className="text-sm">
              Yukarıdaki formu kullanarak ilkini şimdi ekleyin!
            </p>
          </div>
        )}

        <div className="space-y-6">
          {workouts.map((workout) => (
            <div
              key={workout.id}
              className="bg-slate-800 p-6 rounded-lg shadow-xl relative group"
            >
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
                <button
                  onClick={() => handleDeleteWorkout(workout.id)}
                  className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
