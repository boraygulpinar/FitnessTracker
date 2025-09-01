import { useState, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Statistics = ({ workouts, templates }) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState("");

  // useMemo, gereksiz yeniden hesaplamaları önler
  const chartData = useMemo(() => {
    if (!selectedTemplateId || workouts.length === 0) {
      return [];
    }

    const data = workouts
      .flatMap((workout) =>
        workout.appliedExercises.map((ex) => ({
          ...ex,
          date: new Date(workout.date),
        }))
      )
      .filter(
        (ex) => ex.exerciseTemplate.id === parseInt(selectedTemplateId, 10)
      )
      .sort((a, b) => a.date - b.date)
      // grafiğin anlayacağı formata dönüştürme
      .map((ex) => ({
        date: ex.date.toLocaleDateString("tr-TR"),
        weight: ex.weight,
      }));

    return data;
  }, [workouts, selectedTemplateId]);

  const handleTemplateChange = (e) => {
    setSelectedTemplateId(e.target.value);
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 text-white">İlerleme Grafiği</h2>

      <div className="mb-6">
        <label
          htmlFor="template-select"
          className="block text-sm font-medium text-slate-300 mb-1"
        >
          Grafik için Egzersiz Seçin
        </label>
        <select
          id="template-select"
          value={selectedTemplateId}
          onChange={handleTemplateChange}
          className="w-full md:w-1/3 bg-slate-700 text-white rounded-md p-2 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
        >
          <option value="">-- Egzersiz Seçin --</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {selectedTemplateId && chartData.length > 1 ? (
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
              <XAxis dataKey="date" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" domain={["dataMin - 5", "dataMax + 5"]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1e293b",
                  borderColor: "#334155",
                }}
                labelStyle={{ color: "#cbd5e1" }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="#38bdf8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Ağırlık (kg)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="text-center text-slate-400 p-8">
          <p>
            {selectedTemplateId
              ? "Bu egzersiz için grafik oluşturmaya yetecek veri (en az 2 kayıt) bulunmuyor."
              : "Lütfen ilerlemesini görmek için bir egzersiz seçin."}
          </p>
        </div>
      )}
    </div>
  );
};

export default Statistics;
