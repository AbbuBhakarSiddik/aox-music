import { Box, Chip } from "@mui/material";

type FiltersProps = {
  selected: string;
  onChange: (tag: string) => void;
};

const filters = [
  { label: "Trending", tag: "trending" },
  { label: "Lofi", tag: "lofi" },
  { label: "Hindi", tag: "hindi" },
  { label: "Kannada", tag: "kannada" },
];

export default function Filters({ selected, onChange }: FiltersProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", pb: 3, px: 2 }}>
      <Box sx={{ display: "flex", gap: 1, overflowX: "auto" }}>
        {filters.map((f) => (
          <Chip
            key={f.tag}
            label={f.label}
            clickable
            color={selected === f.tag ? "primary" : "default"}
            onClick={() => onChange(f.tag)}
            sx={{ fontWeight: selected === f.tag ? 600 : 400 }}
          />
        ))}
      </Box>
    </Box>
  );
}
