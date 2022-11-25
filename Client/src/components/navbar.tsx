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
        <h3 className='maze' onClick={() => navigate('/')}>aMAZEthing</h3>
        {location.pathname ==='/game' && <h3 className='do' onClick={() => navigate('/learning')}>LEARN</h3>}
        {location.pathname ==='/learning' && <h3 className='do' onClick={() => navigate('/game')}>PLAY</h3>}
      </div>
      <div className='navbar-end'>
      {location.pathname ==='/' && <h3 className='do' onClick={() => navigate('/about')}>ABOUT</h3>}
      {!isLoading && !user && (
          <button   
            className = "btn btn-primary btn-block"
            onClick={()=>loginWithRedirect()}
            >
              Log In
            </button>
      )}
      {!isLoading && user && (
          <button   
            className = "btn btn-primary btn-block"
            onClick={()=>logout()}
            >
              Log Out
            </button>
      )}
      </div>
    </div>
  );
}

export default Navbar;
