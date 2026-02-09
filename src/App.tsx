import Home from "./pages/Home";
import { PlayerProvider } from "./context/PlayerContext";

export default function App() {
  return (
    <PlayerProvider>
      <Home />
    </PlayerProvider>
  );
}
