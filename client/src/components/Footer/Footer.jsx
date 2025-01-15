import React, { useState } from "react";
import { Container, Grid, Typography, Button, IconButton, Box, Modal, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const StyledFooter = styled(Box)(({ theme }) => ({
  backgroundColor: "#1a237e",
  color: "#ffffff",
  padding: "48px 0 24px 0",
  marginTop: "auto"
}));

const StyledNav = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  flexWrap: "wrap",
  justifyContent: "center",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center"
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: "#ffffff",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  }
}));

const SocialIcons = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  justifyContent: "center",
  marginTop: "24px"
}));

const Footer = () => {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  const handleContactClick = () => {
    setContactModalOpen(true);
  };

  const handleCloseModal = () => {
    setContactModalOpen(false);
  };

  return (
    <StyledFooter component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Box sx={{ padding: 3 }}>
              <Typography variant="h5" gutterBottom>
                About Us
              </Typography>
              <Typography variant="body1">
                Dedicated to providing the best learning and gaming experience for all our users. Join us and be part of a growing community!
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <StyledNav>
              <StyledButton variant="text" aria-label="Home">
                Home
              </StyledButton>
              <StyledButton variant="text" aria-label="Learning">
                Learning
              </StyledButton>
              <StyledButton variant="text" aria-label="Games">
                Games
              </StyledButton>
              <StyledButton variant="text" aria-label="Chat">
                Chat
              </StyledButton>
              <StyledButton
                variant="outlined"
                onClick={handleContactClick}
                aria-label="Contact Us"
                sx={{ borderColor: "#ffffff" }}
              >
                Contact Us
              </StyledButton>
            </StyledNav>
          </Grid>
        </Grid>

        {/* Social Media Icons */}
        <SocialIcons>
          <IconButton
            aria-label="Facebook"
            sx={{ color: "#ffffff" }}
            component="a"
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook />
          </IconButton>
          <IconButton
            aria-label="Twitter"
            sx={{ color: "#ffffff" }}
            component="a"
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter />
          </IconButton>
          <IconButton
            aria-label="Instagram"
            sx={{ color: "#ffffff" }}
            component="a"
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram />
          </IconButton>
          <IconButton
            aria-label="LinkedIn"
            sx={{ color: "#ffffff" }}
            component="a"
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin />
          </IconButton>
        </SocialIcons>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: "24px", opacity: 0.7 }}
        >
          © {new Date().getFullYear()} All Rights Reserved
        </Typography>

        {/* Contact Us Modal */}
        <Modal
          open={contactModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="contact-modal"
          aria-describedby="contact-form"
        >
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
              width: { xs: "90%", sm: "400px" },
              borderRadius: "8px"
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body1" gutterBottom>
              We would love to hear from you. Please fill out the form below and we'll get back to you as soon as possible.
            </Typography>
            {/* Contact Form Fields */}
            <TextField
              fullWidth
              label="Your Name"
              variant="outlined"
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              label="Your Email"
              type="email"
              variant="outlined"
              sx={{ marginBottom: "16px" }}
            />
            <TextField
              fullWidth
              label="Your Message"
              multiline
              rows={4}
              variant="outlined"
              sx={{ marginBottom: "16px" }}
            />
            <Button
              onClick={handleCloseModal}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Close
            </Button>
          </Box>
        </Modal>
      </Container>
    </StyledFooter>
  );
};

export default Footer;