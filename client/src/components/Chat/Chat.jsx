/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import './chat.css';

// COMPONENT IMPORTS
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';
import SiteTitle from '../SiteTitle/SiteTitle';

// Material-UI Imports
import { Container, Typography, TextField, Button } from '@mui/material';

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks';

const Chat = () => {
  // USESTATE
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);
  const [geminiStream, setGeminiStream] = useState('');
  const [prompt, setPrompt] = useState('');

  // FUNCTION
  const handleClick = async () => {
    // Place your async logic here
    console.log(prompt);
  };

  // USEEFFECT
  useEffect(() => {
    const geminiStream = new EventSource('http://127.0.0.1:4000/chat/gemini');

    geminiStream.onmessage = (event) => {
      if (event.data === '[DONE]') {
        geminiStream.close();
      }
      setGeminiStream((prev) => prev + event.data);

      geminiStream.onerror = (error) => {
        console.log('Error occurred', error);
        geminiStream.close();
      };
      return () => {
        geminiStream.close();
      };
    };
  }, []);

  // RENDER
  return (
    <Container
      maxWidth="md"
      style={{ padding: '20px', backgroundColor: '#121212', color: '#FFFFFF' }}
    >
      <SiteTitle />
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
        CHAT PAGE
      </Typography>
      <Typography variant="body1" gutterBottom>
        {geminiStream}
      </Typography>
      <form>
        <TextField
          fullWidth
          multiline
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here"
          variant="outlined"
          style={{ marginBottom: '10px' }}
        />
        <Button
          variant="contained"
          onClick={() => handleClick()}
          sx={{
            background: 'linear-gradient(90deg, #1de9b6, rgb(7, 70, 77))',
            color: 'black',
            '&:hover': {
              background: 'linear-gradient(90deg, rgb(15, 99, 78), #1de9ff)',
            },
            padding: '10px 20px',
          }}
        >
          Ask Gemini
        </Button>
      </form>
      <Banner />
      <Footer />
    </Container>
  );
};

export default Chat;