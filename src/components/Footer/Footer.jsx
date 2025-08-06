import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import logo from "../../assets/logo.png";
import fb from "../../assets/fb.png";
import pinterest from "../../assets/pinterest.png";
import twitter from "../../assets/twitter.png";
import yt from "../../assets/yt.png";
import FooterLink from "./FooterLink";

export default function Footer() {
  return (
    <Box bgcolor="primary.secondary" pb={3} pt={6}>
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          {/* Company Info and Social Media */}
          <Grid item xs={12} md={4.5}>
            <Stack
              alignItems="flex-start"
              justifyContent="space-between"
              height={1}
              spacing={3}
            >
              <Box>
                <Box 
                  component="img" 
                  src={logo} 
                  height={36} 
                  alt="Medify Logo" 
                  sx={{ mb: 2 }}
                />
                <Typography 
                  color="#fff" 
                  fontSize={14} 
                  fontWeight={300}
                  sx={{ opacity: 0.8, maxWidth: 300 }}
                >
                  Your trusted partner for healthcare appointments. Find and book appointments with verified doctors and medical centers across India.
                </Typography>
              </Box>
              
              <Stack direction="row" spacing={1.5}>
                <Box 
                  component="img" 
                  src={fb} 
                  height={36} 
                  alt="Facebook"
                  sx={{ cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 0.7 } }}
                />
                <Box 
                  component="img" 
                  src={twitter} 
                  height={36} 
                  alt="Twitter"
                  sx={{ cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 0.7 } }}
                />
                <Box 
                  component="img" 
                  src={yt} 
                  height={36} 
                  alt="YouTube"
                  sx={{ cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 0.7 } }}
                />
                <Box 
                  component="img" 
                  src={pinterest} 
                  height={36} 
                  alt="Pinterest"
                  sx={{ cursor: 'pointer', transition: 'opacity 0.2s', '&:hover': { opacity: 0.7 } }}
                />
              </Stack>
            </Stack>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} md={2.5}>
            <Stack spacing={2}>
              <Typography 
                color="#fff" 
                fontSize={16} 
                fontWeight={600}
                sx={{ mb: 1 }}
              >
                Quick Links
              </Typography>
              <FooterLink>About Us</FooterLink>
              <FooterLink>Our Pricing</FooterLink>
              <FooterLink>Our Gallery</FooterLink>
              <FooterLink>Appointment</FooterLink>
              <FooterLink>Privacy Policy</FooterLink>
            </Stack>
          </Grid>

          {/* Medical Specialties */}
          <Grid item xs={12} md={2.5}>
            <Stack spacing={2}>
              <Typography 
                color="#fff" 
                fontSize={16} 
                fontWeight={600}
                sx={{ mb: 1 }}
              >
                Specialties
              </Typography>
              <FooterLink>Orthology</FooterLink>
              <FooterLink>Neurology</FooterLink>
              <FooterLink>Dental Care</FooterLink>
              <FooterLink>Opthalmology</FooterLink>
              <FooterLink>Cardiology</FooterLink>
            </Stack>
          </Grid>

          {/* Support */}
          <Grid item xs={12} md={2.5}>
            <Stack spacing={2}>
              <Typography 
                color="#fff" 
                fontSize={16} 
                fontWeight={600}
                sx={{ mb: 1 }}
              >
                Support
              </Typography>
              <FooterLink>Contact Us</FooterLink>
              <FooterLink>Help Center</FooterLink>
              <FooterLink>Terms of Service</FooterLink>
              <FooterLink>Refund Policy</FooterLink>
              <FooterLink>FAQs</FooterLink>
            </Stack>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Typography
          fontWeight={300}
          color="#fff"
          fontSize={14}
          pt={3}
          mt={5}
          borderTop="1px solid rgba(255,255,255,0.1)"
          textAlign="center"
          sx={{ opacity: 0.8 }}
        >
          Copyright ©2025 Medify.com. All Rights Reserved
        </Typography>
      </Container>
    </Box>
  );
}
