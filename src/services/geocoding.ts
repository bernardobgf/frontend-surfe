import axios from "axios";

export async function getCoordinates(place: string) {
  const { data } = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: place,
        format: "json",
        limit: 1,
      },
      headers: {
        "Accept-Language": "pt-BR",
      },
    },
  );

  console.log(data); // adiciona essa linha

  if (data.length === 0) {
    throw new Error("Local não encontrado");
  }

  return {
    lat: data[0].lat,
    lng: data[0].lon,
  };
}
