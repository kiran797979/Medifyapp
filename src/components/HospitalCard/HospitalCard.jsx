import icon from "../../assets/hospitalicon.png";
import { Box, Button, Chip, Divider, Stack, Typography } from "@mui/material";
import thumb from "../../assets/thumbsup.png";
import Calendar from "../Calendar/Calendar";
import { useState, useEffect } from "react";
import { format } from "date-fns";

export default function HospitalCard({
  details,
  availableSlots,
  handleBooking,
  booking = false,
}) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);
  const [isButtonReady, setIsButtonReady] = useState(false);

  // Reset booking state when component unmounts or details change
  useEffect(() => {
    return () => {
      setShowCalendar(false);
      setIsBookingInProgress(false);
      setIsButtonReady(false);
    };
  }, [details]);

  // Ensure button is ready after component mounts (timing fix for UI/test reliability)
  useEffect(() => {
    // Small delay to ensure the booking button is rendered and visible for UI tests and user interaction.
    // This ensures the booking button is reliably present and interactable for both users and automated tests.
    const timer = setTimeout(() => {
      setIsButtonReady(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleBookingClick = () => {
    // Prevent interaction if button is not ready or booking is in progress
    if (!isButtonReady || isBookingInProgress) return;
    setIsBookingInProgress(true);
    setShowCalendar((prev) => !prev);
    // Small delay to ensure state updates before any async operations
    setTimeout(() => {
      setIsBookingInProgress(false);
    }, 200);
  };

  const handleBookingSubmit = (bookingDetails) => {
    setIsBookingInProgress(true);
    try {
      handleBooking(bookingDetails);
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsBookingInProgress(false);
    }
  };

  return (
    <Box 
      sx={{ borderRadius: 2, bgcolor: "#fff", p: { xs: 2, md: 4 } }}
      data-testid="hospital-card"
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={{ xs: 1, md: 4 }}
        flexWrap={"wrap"}
      >
        <Box
          component="img"
          src={icon}
          width={{ xs: 64, md: 130 }}
          height="auto"
          sx={{ flexShrink: 0, alignSelf: "start" }}
          alt="Hospital Icon"
        />
        <Box flex={1}>
          <Typography
            component="h3"
            color="primary.main"
            fontWeight={600}
            fontSize={{ xs: 18, md: 20 }}
            mb={1}
            textTransform="capitalize"
            lineHeight={1}
          >
            {details["Hospital Name"].toLowerCase()}
          </Typography>
          <Typography
            textTransform="capitalize"
            color="#414146"
            fontSize={14}
            fontWeight={700}
          >
            {`${details["City"].toLowerCase()}, ${details["State"]}`}
          </Typography>
          <Typography fontSize={14} mb={1}>
            {details["Hospital Type"]}
          </Typography>
          <Stack direction="row" flexWrap="wrap" spacing="4px" mb={2}>
            <Typography
              fontWeight={800}
              textTransform="uppercase"
              color="primary.green"
            >
              Free
            </Typography>
            <Typography
              sx={{ textDecoration: "line-through", color: "#787887" }}
            >
              ₹500
            </Typography>
            <Typography>Consultation fee at clinic</Typography>
          </Stack>
          <Divider sx={{ borderStyle: "dashed", mb: 2 }} />
          <Stack
            direction="row"
            alignItems="center"
            bgcolor="primary.green"
            py="4px"
            px={1}
            borderRadius={1}
            width="fit-content"
            spacing="4px"
          >
            <Box
              component={"img"}
              src={thumb}
              width={{ xs: 16, md: 20 }}
              height={{ xs: 16, md: 20 }}
              alt="Rating Icon"
            />
            <Typography
              fontWeight={700}
              fontSize={{ xs: 14, md: 16 }}
              color="#fff"
              sx={{ opacity: 0.5 }}
            >
              {details["Hospital overall rating"] === "Not Available"
                ? 0
                : details["Hospital overall rating"]}
            </Typography>
          </Stack>
        </Box>

        <Stack
          justifyContent={booking ? "flex-start" : "flex-end"}
          minWidth="23%"
        >
          {!booking && (
            <>
              <Typography
                textAlign="center"
                color="primary.green"
                fontSize={14}
                fontWeight={500}
                mb={1}
              >
                Available Today
              </Typography>
              {/* Booking button is conditionally rendered and ready for interaction */}
              {isButtonReady && (
                <Button
                  variant="contained"
                  disableElevation
                  onClick={handleBookingClick}
                  disabled={isBookingInProgress}
                  data-testid="book-appointment-btn"
                  sx={{
                    minHeight: "48px",
                    transition: "all 0.2s ease-in-out",
                    opacity: isButtonReady ? 1 : 0.5,
                  }}
                >
                  {/* Button text changes based on calendar visibility */}
                  {!showCalendar
                    ? "Book FREE Center Visit"
                    : "Hide Booking Calendar"}
                </Button>
              )}
            </>
          )}

          {booking && (
            <Stack direction="row" spacing={1} mt={{ xs: 2, md: 0 }}>
              <Chip
                label={details.bookingTime}
                variant="outlined"
                color="primary"
                sx={{
                  borderRadius: 1,
                  fontSize: 14,
                }}
              />
              <Chip
                label={format(new Date(details.bookingDate), "dd MMMM yyyy")}
                variant="outlined"
                color="success"
                sx={{
                  borderRadius: 1,
                  fontSize: 14,
                }}
              />
            </Stack>
          )}
        </Stack>
      </Stack>

      {/* Booking calendar is conditionally rendered with proper timing */}
      {showCalendar && (
        <Box
          sx={{
            mt: 3,
            pt: 3,
            borderTop: "1px solid #e0e0e0",
            animation: "fadeIn 0.3s ease-in-out",
            "@keyframes fadeIn": {
              "0%": {
                opacity: 0,
                transform: "translateY(-10px)",
              },
              "100%": {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
          data-testid="booking-calendar"
        >
          {/* Calendar is only rendered when showCalendar is true, ensuring UI/test reliability */}
          <Calendar
            details={details}
            availableSlots={availableSlots}
            handleBooking={handleBookingSubmit}
          />
        </Box>
      )}
    </Box>
  );
}
