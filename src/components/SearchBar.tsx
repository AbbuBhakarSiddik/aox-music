import { Box, TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", px: 2, py: 2 }}>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search songs or artists..."
        fullWidth
        sx={{ maxWidth: 500 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
