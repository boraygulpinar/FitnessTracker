import { useEffect, useState, useRef } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import axios from "axios";

import LandingPage from "./components/LandingPage";
import MainLayout from "./components/MainLayout";
import Dashboard from "./components/Dashboard";
import WorkoutLogPage from "./components/WorkoutLogPage";
import Statistics from "./components/Statistics";
import Login from "./components/Login";
import Register from "./components/Register";
import ProtectedRoute from "./components/ProtectedRoute";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// const API_URL = "http://localhost:5074";
const API_URL = import.meta.env.VITE_API_URL || "/api";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [templates, setTemplates] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [workoutToEdit, setWorkoutToEdit] = useState(null);
  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setWorkouts([]);
    setTemplates([]);
    setError(null);
    setWorkoutToEdit(null);
    navigate("/login");
  };

  const fetchWorkouts = async () => {
    try {
      const response = await axios.get(`${API_URL}/workoutsessions`);
      setWorkouts(response.data);
    } catch (err) {
      setError("Antrenmanlar çekilirken bir hata oluştu.");
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [templatesResponse, workoutsResponse] = await Promise.all([
          axios.get(`${API_URL}/ExerciseTemplates`),
          axios.get(`${API_URL}/workoutsessions`),
        ]);
        setTemplates(templatesResponse.data);
        setWorkouts(workoutsResponse.data);
      } catch (err) {
        setError("Veriler çekilirken bir hata oluştu.");
        console.error(err);
        if (err.response && err.response.status === 401) {
          handleLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleSaveWorkout = async (workoutData) => {
    try {
      if (workoutToEdit) {
        await axios.put(
          `${API_URL}/workoutsessions/${workoutToEdit.id}`,
          workoutData
        );
      } else {
        await axios.post(`${API_URL}/workoutsessions`, workoutData);
      }
      setWorkoutToEdit(null);
      await fetchWorkouts();
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
      await axios.delete(`${API_URL}/workoutsessions/${id}`);
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
      {/* public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route
        path="/login"
        element={<Login onLoginSuccess={() => setIsAuthenticated(true)} />}
      />
      <Route path="/register" element={<Register />} />

      {/* login olunan */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout onLogout={handleLogout} />}>
          <Route
            path="/dashboard"
            element={
              <Dashboard
                workouts={workouts}
                onEdit={handleStartEdit}
                onDelete={handleDeleteWorkout}
              />
            }
          />
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
      </Route>
    </Routes>
  );
}

export default App;
