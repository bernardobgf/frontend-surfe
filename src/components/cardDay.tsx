import { Waves, Wind, Timer, Star } from "lucide-react";
import { type DaySummary } from "../utils/groupByDay";

interface Props {
  day: DaySummary;
  onClick: () => void;
}

function ScoreBadge({ score }: { score: number }) {
  const color =
    score >= 8 ? "bg-green-500" : score >= 5 ? "bg-yellow-500" : "bg-red-500";

  const label = score >= 8 ? "Ótimo 🔥" : score >= 5 ? "Bom 👍" : "Fraco 😴";

  return (
    <span
      className={`${color} text-white text-xs font-bold px-3 py-1 rounded-full`}
    >
      {label} · {score}/10
    </span>
  );
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
}

export function DayCard({ day, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-2xl p-5 cursor-pointer transition-all"
    >
      <div className="flex justify-between items-center mb-3">
        <p className="font-bold text-lg capitalize">{formatDate(day.date)}</p>
        <ScoreBadge score={day.best_score} />
      </div>

      <div className="flex gap-4 text-blue-200 text-sm">
        <span className="flex items-center gap-1">
          <Waves size={14} /> {day.avg_wave_height}m
        </span>
        <span className="flex items-center gap-1">
          <Timer size={14} /> {day.avg_wave_period}s
        </span>
        <span className="flex items-center gap-1">
          <Wind size={14} /> vento {day.avg_wave_height}m
        </span>
        <span className="flex items-center gap-1">
          <Star size={14} /> melhor às{" "}
          {
            day.hours
              .find((h) => h.score === day.best_score)
              ?.time.split("T")[1]
          }
        </span>
      </div>
    </div>
  );
}
