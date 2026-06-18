# 🎵 AOX Music

A sleek, premium, and interactive music streaming web application built using **React 19**, **TypeScript**, **Vite**, and **Material-UI (MUI)**. It integrates with the **Jamendo Music API** to fetch and play high-quality audio tracks, featuring instant search, genre filters, and a custom audio player with real-time controls.

---

## ✨ Key Features

- **Real-Time Music Streaming**: Dynamically fetches and streams music tracks directly from the Jamendo API.
- **Glassmorphism Audio Player**: A beautiful bottom-floating player with standard controls:
  - Play, pause, skip forward (next track), and skip backward (previous track).
  - Drag-and-seek progress bar (slider) for easy track navigation.
  - Active playing status indicated with elapsed time and total duration.
  - Loading / buffering state with a circular progress spinner.
  - Dynamic breathing pulse animation around the play button while playing.
- **Instant Search**: Search for tracks and artists in real-time with responsive results.
- **Category Filtering**: High-level chip filters for quick genre browsing (Trending, Lofi, Hindi, Kannada).
- **Responsive Layout**: Designed to look stunning on both mobile devices and desktops using a clean MUI grid.
- **Sync States**: Highlighting of the active song in the grid list with a custom "NOW PLAYING" badge.

---

## 🛠️ Technology Stack & Libraries

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vite.dev/) (with fast Hot Module Replacement)
- **UI & Icon Components**: [Material-UI (MUI) v7](https://mui.com/)
- **Styling**: [Emotion](https://emotion.sh/) (CSS-in-JS utility integrated with MUI)
- **API**: [Jamendo Music API v3](https://developer.jamendo.com/v3.0)

---

## 📂 Project Structure

```
aox-music/
├── src/
│   ├── api/
│   │   └── jamendo.ts        # API integrations for fetching and searching songs
│   ├── components/
│   │   ├── Filters.tsx       # Genre/tag chip filter component
│   │   ├── Header.tsx        # App header featuring fade-in animations
│   │   ├── Player.tsx        # Floating audio player and controls
│   │   ├── SearchBar.tsx     # Controlled search input field
│   │   └── SongGrid.tsx      # Grid layout displaying song cards with hover play overlays
│   ├── context/
│   │   ├── PlayerContext.tsx # Context Provider holding player states (queue, currentSong, playing, time, etc.)
│   │   └── usePlayer.ts      # Custom Hook to consume the player context
│   ├── pages/
│   │   └── Home.tsx          # Main application page layout
│   ├── theme.ts              # Custom MUI theme (Inter font family, light backgrounds, custom styling overrides)
│   ├── App.tsx               # App entry wrapping the layout with PlayerProvider
│   └── main.tsx              # React mounting file with ThemeProvider and CssBaseline
├── .env                      # Local environment configurations (holds Jamendo Client ID)
└── package.json              # Script runner and dependency manager
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Clone & Install Dependencies
Navigate to the project directory and install the necessary npm packages:
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (if not already present) and populate it with your Jamendo Client ID:
```env
VITE_JAMENDO_CLIENT_ID=your_jamendo_client_id_here
```
*(A default client ID is configured for sandbox environments).*

### 3. Run the Development Server
Start the local server to preview the app in your browser:
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view the application in action.

### 4. Build for Production
To package the app for production deployment, run:
```bash
npm run build
```
The optimized bundle will be compiled into the `dist/` directory.

---

## 🎧 Custom Player Context State Flow

State is managed globally in `PlayerContext.tsx` via the HTML5 `Audio` constructor API:
1. **`queue`**: List of songs currently loaded in the grid container.
2. **`currentIndex`**: Index pointer of the active song in the play queue.
3. **`currentTime` & `duration`**: Tracks playback progress, syncing updates on standard HTML audio events (`ontimeupdate`, `onloadedmetadata`).
4. **`isLoading` & `isPlaying`**: Buffering status (`oncanplay` resets loading) and play/pause toggle status.
