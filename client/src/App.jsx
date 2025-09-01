import { useEffect, useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

import LandingPage from "./components/LandingPage";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import WorkoutLogPage from "./components/WorkoutLogPage";
import Statistics from "./components/Statistics";

const API_URL = "http://localhost:5074";

function App() {
  const [templates, setTemplates] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

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
    }
  };

  const handleDeleteWorkout = async (id) => {
    if (
      !window.confirm(
        "Bu antrenmanı kalıcı olarak silmek istediğinizden emin misiniz?"
      )
    )
      return;
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
    navigate("/workouts");
    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  };

  const handleCancelEdit = () => {
    setWorkoutToEdit(null);
  };

  return (
    <Routes>
      {/* landingpage */}
      <Route path="/" element={<LandingPage />} />

      {/* mainapp */}
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard workouts={workouts} />} />
        <Route
          path="/workouts"
          element={
            <WorkoutLogPage
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
      </Route>
    </Routes>
  );
}

export default App;
