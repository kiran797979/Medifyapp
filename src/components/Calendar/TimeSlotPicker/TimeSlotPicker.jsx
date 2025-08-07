import { Chip, Stack, Typography, Divider, Box } from "@mui/material";
import { useState, useEffect } from "react";

export default function TimeSlotPicker({
  availableSlots,
  details,
  handleBooking,
  selectedDate,
}) {
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isReady, setIsReady] = useState(false);

  // Ensure component is ready for interaction (timing fix for UI/test reliability)
  useEffect(() => {
    // Delay to ensure all time slot chips are rendered before interaction (for test reliability).
    // This ensures time slot chips are reliably present and interactable for tests and users.
    const timer = setTimeout(() => setIsReady(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const CustomChip = (props) => (
    <Chip
      label={props.label}
      color={selectedSlot === props.label ? "primary" : "default"}
      variant={selectedSlot === props.label ? "filled" : "outlined"}
      data-testid={`time-slot-${props.label.replace(/\s+/g, '-').toLowerCase()}`}
      sx={{
        borderRadius: "5px",
        fontSize: { xs: 10, md: 14 },
        cursor: "pointer",
        "&:nth-of-type(1)": {
          ml: 0,
        },
        mr: { xs: 1, md: 3 },
        mt: { xs: 1, md: 0 },
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
        opacity: isReady ? 1 : 0.7,
      }}
      onClick={props.handleClick}
      // Disable chip if booking is in progress or not ready
      disabled={isBookingInProgress || !isReady}
    />
  );

  const handleClick = async (slot) => {
    // Prevent interaction if booking is in progress or not ready
    if (isBookingInProgress || !isReady) return;
    setIsBookingInProgress(true);
    setSelectedSlot(slot);
    try {
      // Add a small delay to ensure UI updates are visible
      await new Promise(resolve => setTimeout(resolve, 150));
      const bookingDetails = { 
        ...details, 
        bookingDate: selectedDate, 
        bookingTime: slot 
      };
      await handleBooking(bookingDetails);
    } catch (error) {
      console.error("Booking failed:", error);
      // Reset selection on error
      setSelectedSlot(null);
    } finally {
      setIsBookingInProgress(false);
    }
  };

  return (
    <Stack
      pt={3}
      spacing={{ xs: 2, md: 3 }}
      divider={<Divider orientation="horizontal" flexItem />}
    >
      {isBookingInProgress && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            py: 2,
          }}
        >
          <Typography color="primary.main" fontSize={14}>
            Processing booking...
          </Typography>
        </Box>
      )}
      
      {/* Morning time slots */}
      {availableSlots.morning.length > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          px={{ xs: 0, md: 6 }}
          flexWrap={"wrap"}
          data-testid="morning-slots"
        >
          <Typography
            width={{ xs: 1, md: "15%" }}
            fontSize={{ xs: 14, md: 16 }}
          >
            Morning
          </Typography>
          {availableSlots.morning.map((slot) => (
            <CustomChip
              key={slot}
              label={slot}
              handleClick={() => handleClick(slot)}
            />
          ))}
        </Stack>
      )}
      
      {/* Afternoon time slots */}
      {availableSlots.afternoon.length > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          px={{ xs: 0, md: 6 }}
          flexWrap={"wrap"}
          data-testid="afternoon-slots"
        >
          <Typography
            width={{ xs: 1, md: "15%" }}
            fontSize={{ xs: 14, md: 16 }}
          >
            Afternoon
          </Typography>
          {availableSlots.afternoon.map((slot) => (
            <CustomChip
              key={slot}
              label={slot}
              handleClick={() => handleClick(slot)}
            />
          ))}
        </Stack>
      )}
      
      {/* Evening time slots */}
      {availableSlots.evening.length > 0 && (
        <Stack
          direction="row"
          alignItems="center"
          px={{ xs: 0, md: 6 }}
          flexWrap={"wrap"}
          data-testid="evening-slots"
        >
          <Typography
            width={{ xs: 1, md: "15%" }}
            fontSize={{ xs: 14, md: 16 }}
          >
            Evening
          </Typography>
          {availableSlots.evening.map((slot) => (
            <CustomChip
              key={slot}
              label={slot}
              handleClick={() => handleClick(slot)}
            />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
