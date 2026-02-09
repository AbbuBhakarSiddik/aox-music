import {
  Box,
  IconButton,
  Slider,
  Typography,
  CircularProgress,
} from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { usePlayer } from "../context/usePlayer";

function formatTime(seconds: number) {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

export default function Player() {
  const {
    currentSong,
    isPlaying,
    isLoading,
    currentTime,
    duration,
    togglePlay,
    seekTo,
    playNext,
    playPrevious,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 12,
        left: 12,
        right: 12,
        px: 2,
        py: 1.5,
        borderRadius: 3,
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.3)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        display: "flex",
        alignItems: "center",
        gap: 2,
        zIndex: 1000,
      }}
    >
      {/* Song Info */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <MusicNoteIcon />
        <Box>
          <Typography variant="subtitle2" noWrap>
            {currentSong.title}
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {currentSong.artist}
          </Typography>
        </Box>
      </Box>

      {/* Controls */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <IconButton onClick={playPrevious}>
          <SkipPreviousIcon />
        </IconButton>

        <IconButton
          onClick={togglePlay}
          disabled={isLoading}
          sx={{
            backgroundColor: "primary.main",
            color: "primary.contrastText",
            mx: 1,
             position: "relative",
             animation: isPlaying
    ? "pulse 2s ease-in-out infinite"
    : "none",
    "@keyframes pulse": {
    "0%": { boxShadow: "0 0 0 0 rgba(25,118,210,0.6)" },
    "70%": { boxShadow: "0 0 0 12px rgba(25,118,210,0)" },
    "100%": { boxShadow: "0 0 0 0 rgba(25,118,210,0)" },
  },
          }}
        >
          {isLoading ? (
            <CircularProgress size={24} color="inherit" />
          ) : isPlaying ? (
            <PauseIcon />
          ) : (
            <PlayArrowIcon />
          )}
        </IconButton>

        <IconButton onClick={playNext}>
          <SkipNextIcon />
        </IconButton>
      </Box>

      {/* Progress */}
      <Box sx={{ width: 220, display: { xs: "none", sm: "block" } }}>
        <Slider
          size="small"
          min={0}
          max={duration || 0}
          value={Math.min(currentTime, duration || 0)}
          onChange={(_, value) => seekTo(value as number)}
        />
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="caption">
            {formatTime(currentTime)}
          </Typography>
          <Typography variant="caption">
            {formatTime(duration)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
