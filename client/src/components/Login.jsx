import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post("/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token);

      if (onLoginSuccess) {
        onLoginSuccess();
      }

      navigate("/dashboard");
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
      console.error("Login error:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Giriş Yap
        </h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <p className="bg-red-500/80 text-white p-3 rounded mb-4 text-center">
              {error}
            </p>
          )}
          <div className="mb-4">
            <label className="block text-slate-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-300 mb-2" htmlFor="password">
              Şifre
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg transition-all duration-300"
          >
            Giriş Yap
          </button>
        </form>
        <p className="text-center text-slate-400 mt-6">
          Hesabın yok mu?{" "}
          <Link to="/register" className="text-sky-400 hover:underline">
            Hemen Kayıt Ol
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
