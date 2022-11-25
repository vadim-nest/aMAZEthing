import '../css/navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='navbar'>
      <div className='navbar-start'>
        <h3 className='maze' onClick={() => navigate('/')}>aMAZEthing</h3>
        {location.pathname ==='/game' && <h3 className='do' onClick={() => navigate('/learning')}>LEARN</h3>}
        {location.pathname ==='/learning' && <h3 className='do' onClick={() => navigate('/game')}>PLAY</h3>}
      </div>
      <div className='navbar-end'>
      {location.pathname ==='/' && <h3 className='do' onClick={() => navigate('/about')}>ABOUT</h3>}
        <h3 className='login' onClick={() => navigate('/login')}>LOGIN</h3>
      </div>
    </div>
  );
}

export default Navbar;
