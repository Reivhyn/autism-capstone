import { useContext } from 'react';
import './Landing.css';

// CONTEXT IMPORTS
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks';

// ICON IMPORTS
import SchoolIcon from '@mui/icons-material/School';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ChatIcon from '@mui/icons-material/Chat';

const Landing = () => {
  const [, setPageToDisplay] = useContext(ptdContext);
  const [userData] = useContext(userDataContext);

  return (
    <div className="landing">
      {/* Top-right Login and Register Buttons */}
      {!userData ? (
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
      ) : null}

      {/* Site Header */}
      <h1 className="siteNameHeader">Welcome to the Site!</h1>
      <div className="mainPageCards">
        {/* Learning Activities Card */}
        <div
          className="card learningCard"
          onClick={() => setPageToDisplay('learning')}
        >
          <div className="cardIcon">
            <SchoolIcon style={{ fontSize: '3rem', color: '#A3C9A8' }} />
          </div>
          <div className="cardText">Learning Activities</div>
        </div>

        {/* Games Card */}
        <div
          className="card gamesCard"
          onClick={() => setPageToDisplay('games')}
        >
          <div className="cardIcon">
            <SportsEsportsIcon style={{ fontSize: '3rem', color: '#E7B8A5' }} />
          </div>
          <div className="cardText">Games</div>
        </div>

        {/* Chat Card */}
        <div
          className="card chatCard"
          onClick={() => setPageToDisplay('chat')}
        >
          <div className="cardIcon">
            <ChatIcon style={{ fontSize: '3rem', color: '#DD5E56' }} />
          </div>
          <div className="cardText">Chat</div>
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

