import { type SurfCondition } from "../types/surf.js";

export interface DaySummary {
  date: string;
  avg_wave_height: number;
  avg_wave_period: number;
  best_score: number;
  hours: SurfCondition[];
}

export function groupByDay(conditions: SurfCondition[]): DaySummary[] {
  const map = new Map<string, SurfCondition[]>();

  conditions.forEach((c) => {
    const date = c.time.split("T")[0];
    if (!map.has(date)) map.set(date, []);
    map.get(date)!.push(c);
  });

  return Array.from(map.entries()).map(([date, hours]) => ({
    date,
    avg_wave_height: parseFloat(
      (hours.reduce((sum, h) => sum + h.wave_height, 0) / hours.length).toFixed(
        1,
      ),
    ),
    avg_wave_period: parseFloat(
      (hours.reduce((sum, h) => sum + h.wave_period, 0) / hours.length).toFixed(
        1,
      ),
    ),
    best_score: Math.max(...hours.map((h) => h.score)),
    hours,
  }));
}
