import { useEffect, useState, useRef } from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import "./App.css";
import axios from "axios";
import NewWorkoutForm from "./components/NewWorkoutForm";
import WorkoutList from "./components/WorkoutList";
import Statistics from "./components/Statistics";

const API_URL = "http://localhost:5074";

const HomePage = ({
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
}) => (
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

  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "bg-slate-700 text-white px-3 py-2 rounded-md text-sm font-medium"
      : "text-slate-300 hover:bg-slate-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium";

  return (
    <div className="container mx-auto p-4">
      <nav className="bg-slate-800 rounded-lg shadow-lg mb-6">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <h1 className="text-white text-xl font-bold">FitnessTracker</h1>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink to="/" className={navLinkClasses}>
                    Ana Sayfa
                  </NavLink>
                  <NavLink to="/statistics" className={navLinkClasses}>
                    İstatistikler
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              templates={templates}
              workouts={workouts}
              loading={loading}
              error={error}
              onSave={handleSaveWorkout}
              onEdit={handleStartEdit}
              onDelete={handleDeleteWorkout}
              workoutToEdit={workoutToEdit}
              onCancelEdit={handleCancelEdit}
              formRef={formRef}
            />
          }
        />
        <Route
          path="/statistics"
          element={<Statistics workouts={workouts} templates={templates} />}
        />
      </Routes>
    </div>
  );
}

export default App;
