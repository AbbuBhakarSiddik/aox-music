import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  CircularProgress,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useEffect, useState } from "react";
import { fetchSongs, searchSongs } from "../api/jamendo";
import { usePlayer } from "../context/usePlayer";
import type { Song } from "../context/PlayerContext";

type Props = {
  tag: string;
  query: string;
};

export default function SongGrid({ tag, query }: Props) {
  const { playSong, currentSong } = usePlayer();
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
  onClick={() => playSong(song, songs)}
  sx={{
    cursor: "pointer",
    transition: "transform 0.35s ease, box-shadow 0.35s ease",
    borderRadius: 3,
    overflow: "hidden",
    position: "relative",

    "&:hover": {
      transform: "translateY(-6px) scale(1.02)",
      boxShadow: "0 16px 40px rgba(0,0,0,0.18)",
    },

    "&:active": {
      transform: "scale(0.98)",
    },

    ...(currentSong?.audioUrl === song.audioUrl && {
      boxShadow:
        "0 0 0 2px rgba(25,118,210,0.5), 0 16px 40px rgba(25,118,210,0.35)",
    }),
  }}
>
  {/* 🎨 Album Art */}
  <Box sx={{ position: "relative" }}>
    <CardMedia
      component="img"
      height="150"
      image={song.image}
      alt={song.title}
      sx={{
        transition: "transform 0.4s ease",
        ".MuiCard-root:hover &": {
          transform: "scale(1.05)",
        },
      }}
    />

    {/* ▶️ Hover Overlay */}
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0.1))",
        opacity: 0,
        transition: "opacity 0.3s ease",

        ".MuiCard-root:hover &": {
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          width: 52,
          height: 52,
          borderRadius: "50%",
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 10px 25px rgba(0,0,0,0.35)",
        }}
      >
        <PlayArrowIcon sx={{ color: "#fff", fontSize: 30 }} />
      </Box>
    </Box>
  </Box>

  {/* 📝 Song Info */}
  <CardContent sx={{ pb: "12px !important" }}>
    <Typography
      variant="subtitle2"
      noWrap
      fontWeight={600}
      sx={{ lineHeight: 1.3 }}
    >
      {song.title}
    </Typography>

    <Typography
      variant="caption"
      color="text.secondary"
      noWrap
      sx={{ display: "block", mt: 0.5 }}
    >
      {song.artist}
    </Typography>

    {/* 🔵 Now Playing Badge */}
    {currentSong?.audioUrl === song.audioUrl && (
      <Typography
        variant="caption"
        sx={{
          mt: 1,
          display: "inline-block",
          px: 1,
          py: 0.3,
          borderRadius: 1,
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          fontSize: "0.7rem",
          fontWeight: 600,
        }}
      >
        NOW PLAYING
      </Typography>
    )}
  </CardContent>
</Card>
      ))}
    </Box>
  );
}
