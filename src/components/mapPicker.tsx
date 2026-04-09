import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState } from "react";

// corrige o ícone padrão do leaflet que some com Vite
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Props {
  onSelect: (lat: number, lng: number) => void;
}

function ClickHandler({ onSelect }: Props) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export function MapPicker({ onSelect }: Props) {
  const [marker, setMarker] = useState<[number, number] | null>(null);

  function handleSelect(lat: number, lng: number) {
    setMarker([lat, lng]);
    onSelect(lat, lng);
  }

  return (
    <MapContainer
      center={[-15, -50]}
      zoom={4}
      className="w-full h-64 rounded-2xl z-10"
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <ClickHandler onSelect={handleSelect} />
      {marker && <Marker position={marker} />}
    </MapContainer>
  );
}
