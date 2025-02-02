/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Box, Card, CardContent, CardActionArea, Typography, useTheme } from '@mui/material'
import SchoolIcon from '@mui/icons-material/School'
import SportsEsportsIcon from '@mui/icons-material/SportsEsports'
import ChatIcon from '@mui/icons-material/Chat'
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks'
import { darkTheme } from '../zzztheme/themes'
import Logo from '../Logo/Logo'
import SiteTitle from '../SiteTitle/SiteTitle'
import LoginRegisterButton from '../LoginRegisterButton/LoginRegisterButton'

const Landing = () => {
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext)
  const [userData] = useContext(userDataContext)
  const theme = useTheme()

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',  
          justifyContent: 'center',  
          maxHeight: '80%',
          backgroundColor: theme.palette.background.default,
          padding: 2,
          width: '100%',  // Ensure it takes full width
          boxSizing: 'border-box',  // Include padding in width calculations
        }}
      >
        {/* Site Header */}
        <SiteTitle />

        {/* Site Logo */}
        <Logo />

        {/* Main Cards Section */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',  // Allow cards to wrap on smaller screens
            width: '100%',
            marginTop: 2,
            padding: 1,  // Add some padding for better spacing
          }}
        >
          {/* Learning Activities Card */}
          <Card
            sx={{
              width: '200px',  // Adjust card width for smaller screens
              textAlign: 'center',
              backgroundColor: theme.palette.background.paper,
              boxShadow: 3,
              borderRadius: 2,
              marginBottom: 2,
              '@media (max-width: 320px)': {
                width: '90%',  // For very small screens like 320px, reduce card size
              },
            }}
          >
            <CardActionArea onClick={() => setPageToDisplay('learning')}>
              <CardContent>
                <Box sx={{ fontSize: '3rem', color: theme.palette.secondary.main }}>
                  <SchoolIcon fontSize="inherit" />
                </Box>
                <Typography variant="h6">Learning Activities</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Games Card */}
          <Card
            sx={{
              width: '200px',
              textAlign: 'center',
              backgroundColor: theme.palette.background.paper,
              boxShadow: 3,
              borderRadius: 2,
              marginBottom: 2,
              '@media (max-width: 320px)': {
                width: '90%',  // Adjust width for small devices
              },
            }}
          >
            <CardActionArea onClick={() => setPageToDisplay('games')}>
              <CardContent>
                <Box sx={{ fontSize: '3rem', color: theme.palette.secondary.main }}>
                  <SportsEsportsIcon fontSize="inherit" />
                </Box>
                <Typography variant="h6">Games</Typography>
              </CardContent>
            </CardActionArea>
          </Card>

          {/* Chat Card */}
          <Card
            sx={{
              width: '200px',
              textAlign: 'center',
              backgroundColor: theme.palette.background.paper,
              boxShadow: 3,
              borderRadius: 2,
              marginBottom: 2,
              '@media (max-width: 320px)': {
                width: '90%',  // Adjust width for small devices
              },
            }}
          >
            <CardActionArea onClick={() => setPageToDisplay('chat')}>
              <CardContent>
                <Box sx={{ fontSize: '3rem', color: theme.palette.secondary.main }}>
                  <ChatIcon fontSize="inherit" />
                </Box>
                <Typography variant="h6">Chat</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Landing
