/*
 * this component displays the landing page
 */


import { useContext } from 'react';
import './Landing.css';

// COMPONENT IMPORTS
import Banner from '../Banner/Banner';
import Footer from '../Footer/Footer';

// CONTEXT IMPORTS
import { ptdContext, userDataContext } from '../zContextHooks/contextHooks';

// HELPER IPORTS
import { changePage } from '../zzHelpers/helpers';

const Landing = () => {
  const [pageToDisplay, setPageToDisplay] = useContext(ptdContext);
  const [userData, setUserData] = useContext(userDataContext)

  return (
    
    <div className="landing">
      <div className='loginButtons'>
        <button onClick={() =>setPageToDisplay('login')}>Login</button>
        <button onClick={() =>setPageToDisplay('register')}>Register</button>
      </div>

      <h1 className="siteNameHeader">Website Name </h1>

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
      </div>

      <Footer />
    </div>
  );
};

export default Landing;