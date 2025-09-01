import { NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
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
                <NavLink to="" className="text-white text-xl font-bold">
                  FitnessTracker
                </NavLink>
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <NavLink to="/dashboard" className={navLinkClasses}>
                    Ana Panel
                  </NavLink>
                  <NavLink to="/workouts" className={navLinkClasses}>
                    Antrenman Kaydı
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
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
