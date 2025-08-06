import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: "Home", path: "/" },
    { text: "Search", path: "/search" },
    { text: "My Bookings", path: "/my-bookings" },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Medify
      </Typography>
      <Stack spacing={2}>
        {menuItems.map((item) => (
          <Link
            key={item.text}
            to={item.path}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button color="inherit">{item.text}</Button>
          </Link>
        ))}
      </Stack>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ bgcolor: "#fff", color: "#000" }}>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            py={2}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              <Typography variant="h5" fontWeight={700} color="primary.main">
                Medify
              </Typography>
            </Link>

            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Stack direction="row" spacing={2}>
                {menuItems.map((item) => (
                  <Link
                    key={item.text}
                    to={item.path}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <Button color="inherit">{item.text}</Button>
                  </Link>
                ))}
              </Stack>
            </Box>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 240,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
