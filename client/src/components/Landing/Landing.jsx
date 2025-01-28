import React, { useContext } from "react";
import { ThemeProvider } from "@mui/material/styles";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  IconButton,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatIcon from "@mui/icons-material/Chat";
import { ptdContext, userDataContext } from "../zContextHooks/contextHooks";
import { darkTheme } from "../zzztheme/themes"; // Adjust the path to your theme file

const Landing = () => {
  const [, setPageToDisplay] = useContext(ptdContext);
  const [userData] = useContext(userDataContext);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          backgroundColor: "background.default",
          color: "text.primary",
        }}
      >
        {/* Top-right Login and Register Buttons */}
        {!userData && (
          <Box
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              display: "flex",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => setPageToDisplay("login")}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setPageToDisplay("register")}
            >
              Register
            </Button>
          </Box>
        )}

        {/* Site Header */}
        <Typography variant="h2" gutterBottom>
          Welcome to the Site!
        </Typography>

        {/* Main Cards Section */}
        <Box
          sx={{
            display: "flex",
            gap: 4,
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          {/* Learning Activities Card */}
          <Card
            sx={{
              width: 250,
              textAlign: "center",
              backgroundColor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardActionArea onClick={() => setPageToDisplay("learning")}>
              <CardContent>
                <IconButton
                  sx={{ fontSize: "3rem", color: "#A3C9A8" }}
                  disableRipple
                >
                  <SchoolIcon fontSize="inherit" />
                </IconButton>
                <Typography variant="h6" color="text.primary">
                  Learning Activities
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Games Card */}
          <Card
            sx={{
              width: 250,
              textAlign: "center",
              backgroundColor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardActionArea onClick={() => setPageToDisplay("games")}>
              <CardContent>
                <IconButton
                  sx={{ fontSize: "3rem", color: "#E7B8A5" }}
                  disableRipple
                >
                  <SportsEsportsIcon fontSize="inherit" />
                </IconButton>
                <Typography variant="h6" color="text.primary">
                  Games
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Chat Card */}
          <Card
            sx={{
              width: 250,
              textAlign: "center",
              backgroundColor: "background.paper",
              boxShadow: 3,
              borderRadius: 2,
            }}
          >
            <CardActionArea onClick={() => setPageToDisplay("chat")}>
              <CardContent>
                <IconButton
                  sx={{ fontSize: "3rem", color: "#DD5E56" }}
                  disableRipple
                >
                  <ChatIcon fontSize="inherit" />
                </IconButton>
                <Typography variant="h6" color="text.primary">
                  Chat
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            position: "absolute",
            bottom: 16,
            textAlign: "center",
            width: "100%",
            color: "text.secondary",
          }}
        >
          <Typography variant="body2">
            &copy; 2025 Your Site Name. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Landing;