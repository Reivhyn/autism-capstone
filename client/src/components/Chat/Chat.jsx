import  { useContext, useEffect, useState } from 'react';
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
    <Container>
      <Banner />
      <SiteTitle />
      <Typography variant="h4">Chat</Typography>
      <Typography variant="body1" gutterBottom>
        {geminiStream}
      </Typography>
      <TextField
        label="Enter your prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        fullWidth
      />
      <Button onClick={handleClick} variant="contained" color="primary">
        Submit
      </Button>
      <Footer />
    </Container>
  );
};

export default Chat;