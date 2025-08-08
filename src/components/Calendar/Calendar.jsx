import { Stack } from "@mui/material";
import DaySelector from "./DaySelector/DaySelector";
import TimeSlotPicker from "./TimeSlotPicker/TimeSlotPicker";

export default function Calendar({ details, availableSlots, handleBooking }) {
  const selectedDate = new Date(); // Ensure a valid date is provided to time slot picker
  return (
    <Stack spacing={3}>
      <DaySelector />
      <TimeSlotPicker
        availableSlots={availableSlots}
        details={details}
        handleBooking={handleBooking}
        selectedDate={selectedDate}
      />
    </Stack>
  );
}
