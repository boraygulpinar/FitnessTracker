import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('src/assets/background.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div>

      <div className="relative flex flex-col items-center justify-center min-h-screen text-center text-white p-4">
        <h1
          className="text-6xl md:text-8xl font-extrabold mb-4 tracking-wider animate-fade-in-up [text-shadow:0_4px_8px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "0.2s" }}
        >
          FITNESS TRACKER
        </h1>

        <p
          className="text-lg md:text-xl font-light text-slate-200 mb-10 animate-fade-in-up [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]"
          style={{ animationDelay: "0.4s" }}
        >
          Kişisel antrenman günlüğünüz.
        </p>

        <Link
          to="/login"
          className="flex items-center gap-3 bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 text-lg shadow-lg hover:shadow-sky-400/30 transform hover:scale-105 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          Başlamak için Giriş Yap
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
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>
      </div>
      <footer
        className="absolute bottom-0 w-full p-6 animate-fade-in-up"
        style={{ animationDelay: "0.8s" }}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="flex justify-center gap-6">
            <a
              href="https://github.com/boraygulpinar"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.65.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.942.359.308.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.578.688.48A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/boray-gulpinar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
              </svg>
            </a>
            <a
              href="mailto:boraygulpinar@gmail.com"
              aria-label="Mail"
              className="text-slate-400 hover:text-white transition-transform duration-300 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-7 h-7"
              >
                <path
                  d="M1.5 4.5a3 3 0 013-3h15a3 3 0 013 3v15a3 3 0 01-3 3h-15a3 3 0 01-3-3v-15z"
                  fillOpacity="0"
                />
                <path d="M2.25 6.943v10.114c0 1.17.955 2.125 2.125 2.125h15.25c1.17 0 2.125-.955 2.125-2.125V6.943l-9.498 6.332a.75.75 0 01-.754 0L2.25 6.943z" />
                <path d="M21.75 4.875c-.22-.14-.48-.225-.75-.225H3c-.27 0-.53.086-.75.225l9.75 6.5 9.75-6.5z" />
              </svg>
            </a>
          </div>
          <p className="text-slate-400 text-sm">Boray Gülpinar</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
