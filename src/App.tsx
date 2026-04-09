import { useState } from "react";
import axios from "axios";
import { getCoordinates } from "./services/geocoding";
import { type SurfCondition } from "./types/surf";
import { groupByDay, type DaySummary } from "./utils/groupByDay";
import { DayCard } from "./components/cardDay";
import { DayModal } from "./components/dayModal";
import { MapPicker } from "./components/mapPicker";

function App() {
  const [place, setPlace] = useState("");
  const [days, setDays] = useState<DaySummary[]>([]);
  const [selectedDay, setSelectedDay] = useState<DaySummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showMap, setShowMap] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);
      setError("");
      setDays([]);

      const { lat, lng } = await getCoordinates(place);
      await fetchConditions(lat, lng);
    } catch (err) {
      setError("Local não encontrado ou erro ao buscar condições.");
    } finally {
      setLoading(false);
    }
  }

  async function fetchConditions(lat: number, lng: number) {
    setLoading(true);
    setError("");
    setDays([]);

    try {
      const { data } = await axios.get<SurfCondition[]>(
        `https://api-surfe.onrender.com/surf/conditions?lat=${lat}&lng=${lng}`,
      );
      setDays(groupByDay(data));
    } catch (err) {
      setError("Erro ao buscar condições. Verifique as coordenadas.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMapSelect(lat: number, lng: number) {
    setShowMap(false);
    await fetchConditions(lat, lng);
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-900 to-blue-500 text-white p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">
          🏄 Surf Conditions
        </h1>
        <p className="text-center text-blue-200 mb-8">
          Consulte as condições de qualquer praia do mundo
        </p>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="Ex: Praia de Jurerê, Floripa"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="flex-1 px-4 py-3 rounded-xl text-gray-800 placeholder:text-gray-400 outline-none bg-white"
          />
          <button
            onClick={handleSearch}
            className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-xl transition-colors"
          >
            Buscar
          </button>
        </div>

        <button
          onClick={() => setShowMap(!showMap)}
          className="text-blue-200 hover:text-white text-sm mb-4 transition-colors"
        >
          {showMap ? "▲ Fechar mapa" : "🗺️ Selecionar no mapa"}
        </button>

        {showMap && (
          <div className="mb-6">
            <p className="text-blue-200 text-sm mb-2">
              Clique no mapa para selecionar a localização
            </p>
            <MapPicker onSelect={handleMapSelect} />
          </div>
        )}

        {loading && (
          <p className="text-center text-blue-200 animate-pulse">
            Buscando condições...
          </p>
        )}

        {error && <p className="text-center text-red-300">{error}</p>}

        {days.length > 0 && (
          <div className="flex flex-col gap-3">
            {days.map((day) => (
              <DayCard
                key={day.date}
                day={day}
                onClick={() => setSelectedDay(day)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedDay && (
        <DayModal day={selectedDay} onClose={() => setSelectedDay(null)} />
      )}
    </div>
  );
}

export default App;
