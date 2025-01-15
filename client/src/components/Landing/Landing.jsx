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

      {/* Main Page Buttons */}
      <div className="mainPageButtons">
        <button
          className="cardButton"
          onClick={() => setPageToDisplay('learning')}
        >
          <SchoolIcon style={{ marginRight: '10px' }} />
          Learning Activities
        </button>

        <button
          className="cardButton"
          onClick={() => setPageToDisplay('games')}
        >
          <SportsEsportsIcon style={{ marginRight: '10px' }} />
          Games
        </button>

        <button
          className="cardButton"
          onClick={() => setPageToDisplay('chat')}
        >
          <ChatIcon style={{ marginRight: '10px' }} />
          Chat
        </button>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Your Site Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;