import { Container, Stack, Box, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import icon from "../assets/tick.png";
import cta from "../assets/cta.png";
import SearchHospital from "../components/SearchHospital/SearchHospital";
import BookingModal from "../components/BookingModal/BookingModal";
import AutohideSnackbar from "../components/AutohideSnackbar/AutohideSnackbar";
import NavBar from "../components/NavBar/NavBar";

export default function Search() {
  const [searchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState([]);
  const [state, setState] = useState(searchParams.get("state"));
  const [city, setCity] = useState(searchParams.get("city"));
  const availableSlots = {
    morning: ["11:30 AM"],
    afternoon: ["12:00 PM", "12:30 PM", "01:30 PM", "02:00 PM", "02:30 PM"],
    evening: ["06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM"],
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({});
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  //API to fetch hospitals based on state and city selection 
  useEffect(() => {
    const getHospitals = async () => {
      if (!state || !city) {
        setHospitals([]);
        setError(null);
        setIsInitialLoad(false);
        return;
      }

      setHospitals([]);
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await axios.get(
          `https://meddata-backend.onrender.com/data?state=${state}&city=${city}`,
          { timeout: 15000 } // Add timeout for better reliability
        );
        setHospitals(data.data);
        setIsLoading(false);
        setIsInitialLoad(false);
      } catch (err) {
        console.log(err);
        setError("Failed to load hospitals. Please try again.");
        setIsLoading(false);
        setIsInitialLoad(false);
      }
    };

    getHospitals();
  }, [state, city]);

  useEffect(() => {
    setState(searchParams.get("state"));
    setCity(searchParams.get("city"));
  }, [searchParams]);

  // show booking modal
  const handleBookingModal = (details) => {
    setBookingDetails(details);
    setIsModalOpen(true);
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          background: "linear-gradient(#EFF5FE, rgba(241,247,255,0.47))",
          width: "100%",
          pl: 0,
        }}
      >
        <Box
          sx={{
            position: "relative",
            background: "linear-gradient(90deg, #2AA7FF, #0C8CE5)",
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <Container
            maxWidth="xl"
            sx={{
              background: "#fff",
              p: 3,
              borderRadius: 2,
              transform: "translatey(50px)",
              mb: "50px",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          >
            <SearchHospital />
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ pt: 8, pb: 10, px: { xs: 0, md: 4 } }}>
          {hospitals.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                component="h1"
                fontSize={24}
                lineHeight={1.1}
                mb={2}
                fontWeight={500}
              >
                {`${hospitals.length} medical centers available in `}
                <span style={{ textTransform: "capitalize" }}>
                  {city.toLowerCase()}
                </span>
              </Typography>
              <Stack direction="row" spacing={2}>
                <img src={icon} height={24} width={24} alt="icon" />
                <Typography color="#787887" lineHeight={1.4}>
                  Book appointments with minimum wait-time & verified doctor
                  details
                </Typography>
              </Stack>
            </Box>
          )}

          <Stack alignItems="flex-start" direction={{ md: "row" }}>
            <Stack
              mb={{ xs: 4, md: 0 }}
              spacing={3}
              width={{ xs: 1, md: "calc(100% - 384px)" }}
              mr="24px"
            >
              {/* Hospital cards are rendered with proper data-testid for testing */}
              {hospitals.length > 0 &&
                hospitals.map((hospital, index) => (
                  <HospitalCard
                    key={hospital["Hospital Name"]}
                    details={hospital}
                    availableSlots={availableSlots}
                    handleBooking={handleBookingModal}
                    data-testid={`hospital-card-${index}`}
                  />
                ))}

              {/* Loading state with proper timeout */}
              {isLoading && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: "#fff",
                    p: 4,
                    borderRadius: 2,
                    flexDirection: "column",
                    gap: 2,
                  }}
                  data-testid="loading-hospitals"
                >
                  <CircularProgress color="primary" />
                  <Typography variant="h6" color="primary.main">
                    Loading hospitals...
                  </Typography>
                </Box>
              )}

              {/* Error state */}
              {error && (
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 3,
                    borderRadius: 2,
                    border: "1px solid #ffcdd2",
                  }}
                  data-testid="error-message"
                >
                  <Typography color="error.main" textAlign="center">
                    {error}
                  </Typography>
                </Box>
              )}

              {/* Initial state - prompt to select state and city */}
              {!state && !city && !isLoading && !error && !isInitialLoad && (
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                  data-testid="select-prompt"
                >
                  <Typography variant="h6" color="text.secondary">
                    Please select a state and city to search for hospitals
                  </Typography>
                </Box>
              )}

              {/* No hospitals found state */}
              {hospitals.length === 0 && state && city && !isLoading && !error && !isInitialLoad && (
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                  data-testid="no-hospitals"
                >
                  <Typography variant="h6" color="text.secondary">
                    No hospitals found in {city}, {state}
                  </Typography>
                </Box>
              )}
            </Stack>

            <img src={cta} width={360} height="auto" alt="banner" />
          </Stack>
        </Container>

        <BookingModal
          open={isModalOpen}
          setOpen={setIsModalOpen}
          bookingDetails={bookingDetails}
          showSuccessMessage={setShowBookingSuccess}
        />

        <AutohideSnackbar
          open={showBookingSuccess}
          setOpen={setShowBookingSuccess}
          message="Booking Successful"
        />
      </Box>
    </>
  );
}
