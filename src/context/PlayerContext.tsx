import { createContext, useRef, useState } from "react";
import type { ReactNode } from "react";

export type Song = {
  title: string;
  artist: string;
  audioUrl?: string;
  image?: string;
};

export type PlayerContextType = {
  currentSong: Song | null;
  isPlaying: boolean;
  isLoading: boolean;
  currentTime: number;
  duration: number;
  playSong: (song: Song, list?: Song[]) => void;
  togglePlay: () => void;
  seekTo: (time: number) => void;
  playNext: () => void;
  playPrevious: () => void;
};

export const PlayerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const loadAndPlay = (song: Song) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    if (!song.audioUrl) return;

    setIsLoading(true);
    setCurrentTime(0);
    setDuration(0);

    const audio = new Audio(song.audioUrl);
    audioRef.current = audio;

    audio.onloadedmetadata = () => {
      setDuration(audio.duration || 0);
    };

    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.oncanplay = () => {
      setIsLoading(false);
      audio.play();
      setIsPlaying(true);
    };

    audio.onended = () => {
      playNext();
    };

    audio.onerror = () => {
      setIsLoading(false);
      setIsPlaying(false);
    };

    setCurrentSong(song);
  };

  const playSong = (song: Song, list?: Song[]) => {
    if (list && list.length > 0) {
      setQueue(list);
      const index = list.findIndex(
        (s) => s.audioUrl === song.audioUrl
      );
      setCurrentIndex(index >= 0 ? index : 0);
    }

    loadAndPlay(song);
  };

  const playNext = () => {
    if (queue.length === 0) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex < queue.length) {
      setCurrentIndex(nextIndex);
      loadAndPlay(queue[nextIndex]);
    }
  };

  const playPrevious = () => {
    if (queue.length === 0) return;

    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      setCurrentIndex(prevIndex);
      loadAndPlay(queue[prevIndex]);
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || isLoading) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying((p) => !p);
  };

  const seekTo = (time: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        isLoading,
        currentTime,
        duration,
        playSong,
        togglePlay,
        seekTo,
        playNext,
        playPrevious,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}
