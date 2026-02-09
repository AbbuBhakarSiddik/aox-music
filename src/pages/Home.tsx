import { Box } from "@mui/material";
import { useState } from "react";
import Header from "../components/Header";
import Filters from "../components/Filters";
import SearchBar from "../components/SearchBar";
import SongGrid from "../components/SongGrid";
import Player from "../components/Player";

export default function Home() {
  const [tag, setTag] = useState("lofi");
  const [query, setQuery] = useState("");

  return (
    <Box pb={10}>
      <Header />
      <Filters selected={tag} onChange={setTag} />
      <SearchBar value={query} onChange={setQuery} />
      <SongGrid tag={tag} query={query} />
      <Player />
    </Box>
  );
}
