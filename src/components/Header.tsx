import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        pt: 8,
        pb: 5,
        textAlign: "center",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.04), transparent)",
        animation: "fadeSlide 1s ease ",
        "@keyframes fadeSlide": {
          from: {
            opacity: 0,
            transform: "translateY(-20px)",
          },
          to: {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
      }}
    >
      <Typography variant="h1">
        AOX Music
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mt: 1 }}
      >
        Listen freely.
      </Typography>
    </Box>
  );
}
