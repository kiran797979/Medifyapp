import { Stack } from "@mui/material";
import DaySelector from "./DaySelector/DaySelector";
import TimeSlotPicker from "./TimeSlotPicker/TimeSlotPicker";

export default function Calendar({ details, availableSlots, handleBooking }) {
  return (
    <Stack spacing={3}>
      <DaySelector />
      <TimeSlotPicker
        availableSlots={availableSlots}
        details={details}
        handleBooking={handleBooking}
      />
    </Stack>
  );
}
