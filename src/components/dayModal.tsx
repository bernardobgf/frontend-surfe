import { X, Waves, Wind, Timer } from "lucide-react";
import { type DaySummary } from "../utils/groupByDay";

interface Props {
  day: DaySummary;
  onClose: () => void;
}

function ScoreIcon({ score }: { score: number }) {
  if (score >= 8) return <span>🔥</span>;
  if (score >= 5) return <span>👍</span>;
  return <span>😴</span>;
}

export function DayModal({ day, onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-blue-900 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold capitalize">
            {new Date(day.date + "T00:00:00").toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "2-digit",
              month: "long",
            })}
          </h2>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-2">
          {day.hours.map((h) => (
            <div
              key={h.time}
              className="bg-white/10 rounded-xl p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{h.time.split("T")[1]}</p>
                <div className="flex gap-3 text-blue-200 text-xs mt-1">
                  <span className="flex items-center gap-1">
                    <Waves size={12} /> {h.wave_height}m
                  </span>
                  <span className="flex items-center gap-1">
                    <Timer size={12} /> {h.wave_period}s
                  </span>
                  <span className="flex items-center gap-1">
                    <Wind size={12} /> {h.wind_wave_height}m
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ScoreIcon score={h.score} />
                <span className="text-sm font-bold">{h.score}/10</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
