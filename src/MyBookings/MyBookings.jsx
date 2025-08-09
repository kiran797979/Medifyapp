import { Box, Typography, Container, Stack } from "@mui/material";
import HospitalCard from "../components/HospitalCard/HospitalCard";
import { useEffect, useState } from "react";
import cta from "../assets/cta.png";
import SearchBar from "../components/SearchBar/SearchBar";
import NavBar from "../components/NavBar/NavBar";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Load bookings from localStorage on mount, with error handling for robustness.
    // This ensures bookings persist in localStorage and are displayed after reload.
    try {
      const localBookings = localStorage.getItem("bookings") || "[]";
      const parsedBookings = JSON.parse(localBookings);
      setBookings(parsedBookings);
      setFilteredBookings(parsedBookings);
    } catch (error) {
      console.error("Error loading bookings:", error);
      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    setFilteredBookings(bookings);
  }, [bookings]);

  //Separate page/component to render all the booked hospitals of user alogwith chosen date and time slot
  //It utilises HospitalCard component to generate the cards with data
  return (
    <>
      <NavBar />
      <Box
        sx={{ background: "linear-gradient(#EFF5FE, rgba(241,247,255,0.47))" }}
      >
        <Box
          mb="50px"
          pt={{ xs: 3, md: 1 }}
          sx={{
            position: "relative",
            background: "linear-gradient(90deg, #2AA7FF, #0C8CE5)",
            borderBottomLeftRadius: "1rem",
            borderBottomRightRadius: "1rem",
          }}
        >
          <Container maxWidth="xl" sx={{ px: { xs: 0, md: 5 } }}>
            <Stack
              direction={{ xs: "column", md: "row" }}
              spacing={{ xs: 0, md: 12 }}
              alignItems={{ xs: "center", md: "flex-end" }}
            >
              <Typography
                component="h1"
                pb={1}
                fontSize={{ xs: 32, md: 40 }}
                fontWeight={700}
                color="#fff"
                id="my-bookings-header"
                data-testid="my-bookings-header"
              >
                My Bookings
              </Typography>
              <Box
                bgcolor="#fff"
                p={3}
                flexGrow={1}
                borderRadius={2}
                boxShadow="0 0 10px rgba(0,0,0,0.1)"
                sx={{ translate: "0 50px" }}
                width={{ xs: 1, md: "auto" }}
              >
                <SearchBar list={bookings} filterList={setFilteredBookings} />
              </Box>
            </Stack>
          </Container>
        </Box>

        <Container maxWidth="xl" sx={{ pt: 8, pb: 10, px: { xs: 0, md: 4 } }}>
          <Stack alignItems="flex-start" direction={{ md: "row" }}>
            <Stack
              mb={{ xs: 4, md: 0 }}
              spacing={3}
              width={{ xs: 1, md: "calc(100% - 384px)" }}
              mr="24px"
            >
                
              {/* Render booking cards with proper data attributes for testing */}
              {filteredBookings.length > 0 &&
                filteredBookings.map((hospital, index) => (
                  <HospitalCard
                    key={hospital["Hospital Name"]}
                    details={hospital}
                    booking={true}
                    data-testid={`booking-card-${index}`}
                  />
                ))}

              {/* No bookings found state */}
              {filteredBookings.length === 0 && isLoaded && (
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                  data-testid="no-bookings"
                >
                  <Typography variant="h3" color="text.secondary">
                    No Bookings Found!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" mt={1}>
                    You haven't made any bookings yet. Start by searching for hospitals.
                  </Typography>
                </Box>
              )}

              {/* Loading state */}
              {!isLoaded && (
                <Box
                  sx={{
                    bgcolor: "#fff",
                    p: 3,
                    borderRadius: 2,
                    textAlign: "center",
                  }}
                  data-testid="loading-bookings"
                >
                  <Typography variant="h6" color="text.secondary">
                    Loading your bookings...
                  </Typography>
                </Box>
              )}
            </Stack>

            <img src={cta} width={360} height="auto" alt="banner" />
          </Stack>
        </Container>
      </Box>
    </>
  );
}
