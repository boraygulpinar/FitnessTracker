import { useEffect, useState, useRef } from "react";
import "./App.css";
import axios from "axios";
import NewWorkoutForm from "./components/NewWorkoutForm";
import WorkoutList from "./components/WorkoutList";

const API_URL = "http://localhost:5074";

function App() {
  const [templates, setTemplates] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const formRef = useRef(null);

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
    try {
      if (workoutToEdit) {
        await axios.put(
          `${API_URL}/api/workoutsessions/${workoutToEdit.id}`,
          workoutData
        );
      } else {
        await axios.post(`${API_URL}/api/workoutsessions`, workoutData);
      }
      setWorkoutToEdit(null);
      fetchWorkouts();
    } catch (error) {
      console.error("Antrenman kaydedilirken bir hata oluştu", error);
      if (error.response) {
        console.error("Sunucu Hatası:", error.response.data);
      }
    }
  };

  const handleDeleteWorkout = async (id) => {
    if (
      !window.confirm(
        "Bu antrenmanı kalıcı olarak silmek istediğinizden emin misiniz?"
      )
    ) {
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

  const handleStartEdit = (workout) => {
    setWorkoutToEdit(workout);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setWorkoutToEdit(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div ref={formRef}>
        <NewWorkoutForm
          templates={templates}
          onSave={handleSaveWorkout}
          workoutToEdit={workoutToEdit}
          onCancelEdit={handleCancelEdit}
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
          onEdit={handleStartEdit}
          onDelete={handleDeleteWorkout}
        />
      </div>
    </div>
  );
}

export default App;
