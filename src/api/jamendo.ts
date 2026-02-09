const CLIENT_ID = import.meta.env.VITE_JAMENDO_CLIENT_ID;

type JamendoTrack = {
  name: string;
  artist_name: string;
  audio: string;
  image: string;
};

type JamendoResponse = {
  results: JamendoTrack[];
};

export async function fetchSongs(tag = "lofi") {
  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks?client_id=${CLIENT_ID}&format=json&limit=20&tags=${tag}&audioformat=mp32`
  );

  const data: JamendoResponse = await res.json();

  return data.results.map((track) => ({
    title: track.name,
    artist: track.artist_name,
    audioUrl: track.audio,
    image: track.image,
  }));
}

export async function searchSongs(query: string) {
  const res = await fetch(
    `https://api.jamendo.com/v3.0/tracks?client_id=${CLIENT_ID}&format=json&limit=20&search=${encodeURIComponent(
      query
    )}&audioformat=mp32`
  );

  const data: JamendoResponse = await res.json();

  return data.results.map((track) => ({
    title: track.name,
    artist: track.artist_name,
    audioUrl: track.audio,
    image: track.image,
  }));
}
