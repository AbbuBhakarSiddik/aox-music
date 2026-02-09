import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#fafafa",
    },
    text: {
      primary: "#111",
      secondary: "#666",
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-1px",
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
