import { Box, Chip, Stack, Typography } from "@mui/material";
import { SlideNextButton, SlidePrevButton } from "./SliderButtons";

export default function DaySelector() {
  return (
    <Box>
      <Stack direction="row" spacing={2} alignItems="center">
        <Chip label={<Typography component="p">Today</Typography>} color="primary" />
        <Chip label={<Typography component="p">Tomorrow</Typography>} variant="outlined" />
        <Chip label={<Typography component="p">Day After</Typography>} variant="outlined" />
        <Box sx={{ position: "relative" }}>
          <SlidePrevButton />
          <SlideNextButton />
        </Box>
      </Stack>
    </Box>
  );
}

