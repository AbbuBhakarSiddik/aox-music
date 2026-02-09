import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { fetchSongs, searchSongs } from "../api/jamendo";
import { usePlayer } from "../context/usePlayer";
import type { Song } from "../context/PlayerContext";

type Props = {
  tag: string;
  query: string;
};

export default function SongGrid({ tag, query }: Props) {
  const { playSong } = usePlayer();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const loadSongs = async () => {
      setLoading(true);

      const data =
        query && query.trim().length > 0
          ? await searchSongs(query)
          : await fetchSongs(tag);

      if (active) {
        setSongs(data);
        setLoading(false);
      }
    };

    loadSongs();

    return () => {
      active = false;
    };
  }, [tag, query]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4 },
        py: 3,
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, 1fr)",
          sm: "repeat(3, 1fr)",
          md: "repeat(4, 1fr)",
        },
        gap: 2,
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      {songs.map((song, index) => (
        <Card
          key={index}
          onClick={() => playSong(song,songs)}
          sx={{
  cursor: "pointer",
  transition: "transform 0.35s ease, box-shadow 0.35s ease",
  borderRadius: 3,

  "&:hover": {
    transform: "translateY(-6px) scale(1.02)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
  },

  "&:active": {
    transform: "scale(0.98)",
  },
}}
        >
          {song.image && (
            <CardMedia
              component="img"
              height="140"
              image={song.image}
              alt={song.title}
            />
          )}

          <CardContent>
            <Typography variant="subtitle2" noWrap>
              {song.title}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {song.artist}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
