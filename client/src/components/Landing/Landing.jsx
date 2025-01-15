import { useContext } from 'react';
import './Landing.css';

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks';

// ICON IMPORTS
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';

import Footer from '../Footer/Footer'

const Landing = () => {
  const [, setPageToDisplay] = useContext(ptdContext);

  return (
    <div className="landing">
      {/* Top-right Login and Register Buttons */}
      <div className="topRightButtons">
        <button
          className="topRightButton"
          onClick={() => setPageToDisplay('login')}
        >
          Login
        </button>
        <button
          className="topRightButton"
          onClick={() => setPageToDisplay('register')}
        >
          Register
        </button>
      </div>

      {/* Site Header */}
      <h1 className="siteNameHeader">Welcome to the Site!</h1>
      <div className="mainPageCards">
      
      {/* Learning Activities Card */}
  <div
    className="card learningCard"
    onClick={() => setPageToDisplay('learning')}
  >
    <SchoolIcon style={{ fontSize: '3rem', marginBottom: '10px' }} />
    Learning Activities
  </div>

  {/* Games Card */}
  <div
    className="card gamesCard"
    onClick={() => setPageToDisplay('games')}
  >
    <SportsEsportsIcon style={{ fontSize: '3rem', marginBottom: '10px' }} />
    Games
  </div>

  {/* Chat Card */}
  <div
    className="card chatCard"
    onClick={() => setPageToDisplay('chat')}
  >
    <ChatIcon style={{ fontSize: '3rem', marginBottom: '10px' }} />
    Chat
  </div>
</div>
      
      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Your Site Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;