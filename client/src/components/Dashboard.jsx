import { useMemo } from "react";
import { Link } from "react-router-dom";

const Dashboard = ({ workouts }) => {
  const stats = useMemo(() => {
    // hafta baslangic pazartesi
    const today = new Date();
    const dayOfWeek = today.getDay(); // pazar = 0 / pazartesi = 1
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // pazartesi
    const startOfWeek = new Date(new Date().setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);

    const workoutsThisWeek = workouts.filter(
      (w) => new Date(w.date) >= startOfWeek
    ).length;

    const totalWorkouts = workouts.length;
    const lastWorkoutDate =
      totalWorkouts > 0
        ? new Date(workouts[0].date).toLocaleDateString("tr-TR")
        : "Yok";

    return { totalWorkouts, workoutsThisWeek, lastWorkoutDate };
  }, [workouts]);

  const StatCard = ({ title, value, unit }) => (
    <div className="bg-slate-700 p-6 rounded-lg shadow-lg">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-white">
        {value}{" "}
        <span className="text-lg font-medium text-slate-300">{unit}</span>
      </p>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-6">Ana Panel</h1>

      {/* stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Toplam Antrenman" value={stats.totalWorkouts} />
        <StatCard title="Bu Haftaki Antrenman" value={stats.workoutsThisWeek} />
        <StatCard title="Son Antrenman" value={stats.lastWorkoutDate} />
      </div>

      {/* buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Link
          to="/workouts"
          className="bg-sky-600 hover:bg-sky-500 text-white text-center font-bold py-6 px-4 rounded-lg transition-colors text-xl shadow-lg"
        >
          Yeni Antrenman Başlat
        </Link>
        <Link
          to="/statistics"
          className="bg-slate-600 hover:bg-slate-500 text-white text-center font-bold py-6 px-4 rounded-lg transition-colors text-xl shadow-lg"
        >
          İlerlemeni Gör
        </Link>
      </div>

      {/* last actvs. */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Son Aktiviteler</h2>
        {workouts.length > 0 ? (
          <div className="space-y-4">
            {workouts.slice(0, 2).map((workout) => (
              <div
                key={workout.id}
                className="bg-slate-800 p-4 rounded-lg shadow-md"
              >
                <p className="font-semibold text-sky-400">
                  {new Date(workout.date).toLocaleDateString("tr-TR", {
                    day: "numeric",
                    month: "long",
                  })}
                </p>
                <p className="text-sm text-slate-300">
                  {workout.appliedExercises.length} egzersiz,{" "}
                  {workout.cardioDuration || 0} dk kardiyo
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400">Henüz kayıtlı bir aktivite yok.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
