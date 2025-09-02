import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    setSuccess("");

    if (password !== confirmPassword) {
      setErrors(["Şifreler uyuşmuyor."]);
      return;
    }

    try {
      await axios.post("/api/auth/register", {
        email,
        password,
        confirmPassword,
      });
      setSuccess("Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors(["Kayıt sırasında bir hata oluştu. Lütfen tekrar deneyin."]);
      }
      console.error("Registration error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-8 rounded-lg shadow-lg w-full max-w-md animate-fade-in">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Kayıt Ol
        </h2>
        <form onSubmit={handleSubmit}>
          {errors.length > 0 && (
            <div className="bg-red-500/80 text-white p-3 rounded mb-4 text-left">
              <ul className="list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          {success && (
            <p className="bg-green-500/80 text-white p-3 rounded mb-4 text-center">
              {success}
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
          <div className="mb-4">
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
          <div className="mb-6">
            <label
              className="block text-slate-300 mb-2"
              htmlFor="confirm-password"
            >
              Şifreyi Onayla
            </label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 bg-slate-700 border border-slate-600 rounded-md text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 rounded-lg transition-all duration-300"
          >
            Kayıt Ol
          </button>
        </form>
        <p className="text-center text-slate-400 mt-6">
          Zaten bir hesabın var mı?{" "}
          <Link to="/login" className="text-sky-400 hover:underline">
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
