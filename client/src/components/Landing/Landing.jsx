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
  useTheme,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatIcon from "@mui/icons-material/Chat";
import { ptdContext, userDataContext } from "../zContextHooks/contextHooks";
import { darkTheme } from "../zzztheme/themes"; // Adjust the path to your theme file
import Logo from "../Logo/Logo";
import SiteTitle from "../SiteTitle/SiteTitle";
import LoginRegisterButton from "../LoginRegisterButton/LoginRegisterButton";
import { ImPriceTag } from "react-icons/im";

const Landing = () => {
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);
  const [userData] = useContext(userDataContext);
  const theme = useTheme();

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
      
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          maxHeight: "100vh",
          backgroundColor: theme.palette.background.default,
        }}
      >
        {/* Top-right Login and Register Buttons */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            display: "flex",
          }}
        >
        <LoginRegisterButton />
        </Box>
        {/* Site Logo */}
        <Logo />

        {/* Site Header */}
        <SiteTitle />

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
              backgroundColor: theme.palette.background.paper,
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
              backgroundColor: theme.palette.background.paper,
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
              backgroundColor: theme.palette.background.paper,
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

        
      </Box>
    </ThemeProvider>
  );
};

export default Landing;