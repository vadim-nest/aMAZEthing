import '../css/navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='navbar'>
      <div className='navbar-start'>
        <p className='maze' onClick={() => navigate('/')}>aMAZEthing</p>
        {location.pathname ==='/game' && <p className='do' onClick={() => navigate('/learning')}>LEARN</p>}
        {location.pathname ==='/learning' && <p className='do' onClick={() => navigate('/game')}>PLAY</p>}
      </div>
      <div className='navbar-end'>
        <p className='login' onClick={() => navigate('/login')}>LOGIN</p>
      </div>
    </div>
  );
}

export default Navbar;
