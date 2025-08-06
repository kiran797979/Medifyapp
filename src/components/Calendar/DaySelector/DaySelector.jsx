import { Box, Chip, Stack } from "@mui/material";
import { SlideNextButton, SlidePrevButton } from "./SliderButtons";

export default function DaySelector() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Chip label="Today" color="primary" />
        <Chip label="Tomorrow" variant="outlined" />
        <Chip label="Day After" variant="outlined" />
        <Box sx={{ position: "relative" }}>
          <SlidePrevButton />
          <SlideNextButton />
        </Box>
      </Stack>
    </Box>
  );
}

