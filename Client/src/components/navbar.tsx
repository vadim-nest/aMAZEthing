import '../css/navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0} from "@auth0/auth0-react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {loginWithRedirect,logout,user,isLoading } = useAuth0();
  return (
    <div className='navbar'>
      <div className='navbar-start'>
        <button onClick={() => navigate('/')}>aMAZEthing</button>
        {location.pathname ==='/game' && <button onClick={() => navigate('/learning')}>LEARN</button>}
        {location.pathname ==='/learning' && <button onClick={() => navigate('/game')}>PLAY</button>}
      </div>
      <div className='navbar-end'>
      {location.pathname ==='/' && <button onClick={() => navigate('/about')}>ABOUT</button>}
      {!isLoading && !user && (
          <button   
            onClick={()=>loginWithRedirect()}
            >
              LOGIN
            </button>
      )}
      {!isLoading && user && (
          <button   
            onClick={()=>logout()}
            >
              LOGOUT
            </button>
      )}
      </div>
    </div>
  );
}

export default Navbar;
