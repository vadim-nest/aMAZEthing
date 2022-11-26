import '../css/navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth0} from "@auth0/auth0-react";
import { useEffect } from 'react';
import apiService from '../services/apiService';
import { useAppDispatch, useAppSelector } from '../features/hooks';
import { refreshData } from '../features/user_slice';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const {loginWithRedirect,logout, user, isLoading, isAuthenticated } = useAuth0();
  const dispatch = useAppDispatch();
  useEffect(()=>
  {
    (async function evalAuth(){
      if(isAuthenticated===true){
        const userData = await apiService.profile();
        console.log(user,userData)
        dispatch(refreshData(user?.email))
      }
    })()
    
  },[isAuthenticated])
  return (
    <div className='navbar'>
      <div className='navbar-start'>
        <button className='button' onClick={() => navigate('/')}>aMAZEthing</button>
        {location.pathname ==='/game' && <button className='button' onClick={() => navigate('/learning')}>LEARN</button>}
        {location.pathname ==='/learning' && <button className='button' onClick={() => navigate('/game')}>PLAY</button>}
        {location.pathname ==='/profile' && <button className='button' onClick={() => navigate('/game')}>PLAY</button>}
        {location.pathname ==='/profile' && <button className='button' onClick={() => navigate('/learning')}>LEARN</button>}
      </div>
      <div className='navbar-end'>
      {location.pathname ==='/' && <button className='button' onClick={() => navigate('/about')}>ABOUT</button>}
      {isAuthenticated && !(location.pathname ==='/profile') && <button className='button' onClick={() => navigate('/profile')}>PROFILE</button>}
      {!isLoading && !user && (
          <button  
            className='button' 
            onClick={()=>loginWithRedirect()}
            >
              LOGIN
            </button>
      )}
      {!isLoading && user && (
          <button  
            className='button' 
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
