import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import SmsForm from "./SmsForm";

export default function DownloadApp() {
  const [phone, setPhone] = useState("");

  return (
    <Box
      sx={{
        background: "linear-gradient(90deg, #2AA7FF, #0C8CE5)",
        py: { xs: 4, md: 8 },
      }}
    >
      <Container maxWidth="xl">
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 4, md: 8 }}
          alignItems="center"
        >
          <Box flex={1}>
            <Typography
              component="h2"
              fontSize={{ xs: 24, md: 32 }}
              fontWeight={700}
              color="#fff"
              mb={2}
            >
              Download the Medify App
            </Typography>
            <Typography
              color="#fff"
              fontSize={16}
              fontWeight={300}
              mb={4}
              sx={{ opacity: 0.9 }}
            >
              Get the best healthcare experience on your phone. Download our app
              for easy appointment booking, doctor consultations, and health
              tracking.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              mb={4}
            >
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  px: 3,
                  py: 1.5,
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Download for iOS
              </Button>
              <Button
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#000",
                  color: "#fff",
                  px: 3,
                  py: 1.5,
                  "&:hover": { bgcolor: "#333" },
                }}
              >
                Download for Android
              </Button>
            </Stack>

            <SmsForm phone={phone} setPhone={setPhone} />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "block" },
              flex: 1,
              textAlign: "center",
            }}
          >
            <img
              src="/mobile-app-mockup.png"
              alt="Medify Mobile App"
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
