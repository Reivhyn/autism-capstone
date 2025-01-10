/*
 * this component displays the landing page
 */


import { useContext } from 'react';
import './Landing.css';

// COMPONENT IMPORTS
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';

// CONTEXT IMPORTS
import { ptdContext } from '../zContextHooks/contextHooks';

const Landing = () => {
  const [, setPageToDisplay] = useContext(ptdContext);

  return (
    <div className="landing">
      <h1 className="siteNameHeader">Welcome to the Site!</h1>

      <Banner />

      <div className="mainPageButtons">
        <button
          className="landingButtonText"
          onClick={() => setPageToDisplay('learning')}
        >
          Learning Activities
        </button>

        <button
          className="landingButtonText"
          onClick={() => setPageToDisplay('games')}
        >
          Games
        </button>

        <button
          className="landingButtonText"
          onClick={() => setPageToDisplay('chat')}
        >
          Chat
        </button>

        {/* New Parent Home Button */}
        <button
          className="landingButtonText"
          onClick={() => setPageToDisplay('parent')}
        >
          Parent Home
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default Landing;