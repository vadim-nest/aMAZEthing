import '../css/navbar.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0} from "@auth0/auth0-react";
import MediaQuery from 'react-responsive';
import apiService from '../services/apiService';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { refreshData } from '../features/user_slice';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleNavbar = () => {
    setToggle(!toggle);
  };

  const toggleModal = () => {
    setModalOpen(!modalOpen)
  };
  const {loginWithRedirect,logout, user, isLoading, isAuthenticated } = useAuth0();
  return (
    <>
    <div className="navbar">
      <div className="navbar-start">
        <button className="button" onClick={() => navigate('/')}>
          aMAZEthing
        </button>
        <MediaQuery minWidth={951}>
          {location.pathname === '/game' && (
            <button className="button" onClick={() => navigate('/learning')}>
              LEARN
            </button>
          )}
          {location.pathname === '/learning' && (
            <button className="button" onClick={() => navigate('/game')}>
              PLAY
            </button>
          )}
          {location.pathname === '/profile' && (
            <button className="button" onClick={() => navigate('/game')}>
              PLAY
            </button>
          )}
          {location.pathname === '/profile' && (
            <button className="button" onClick={() => navigate('/learning')}>
              LEARN
            </button>
          )}
        </MediaQuery>
      </div>
      <div className="navbar-end">
        <MediaQuery minWidth={951}>
          {location.pathname === '/' && (
            <button className="button" onClick={() => navigate('/about')}>
              ABOUT
            </button>
          )}
          {isAuthenticated && !(location.pathname === '/profile') && (
            <button className="button" onClick={() => navigate('/profile')}>
              PROFILE
            </button>
          )}
          {!isLoading && !user && (
            <button className="button" onClick={() => loginWithRedirect()}>
              LOGIN
            </button>
          )}
          {!isLoading && user && (
            <button className="button" onClick={() => logout()}>
              LOGOUT
            </button>
          )}
        </MediaQuery>
        <MediaQuery maxWidth={950}>
          <div className="container" onClick={() => {
            toggleNavbar();
            toggleModal();
            }}>
            <div className={`bar1 ${toggle && 'active'}`} />
            <div className={`bar2 ${toggle && 'active'}`} />
            <div className={`bar3 ${toggle && 'active'}`} />
          </div>
        </MediaQuery>
      </div>
    <MediaQuery maxWidth={950}>
        <div className={`modal-body open-${modalOpen}`}>
          <h1>hello</h1>
        </div>
    </MediaQuery>
    </div>
    </>
  );
}

export default Navbar;
