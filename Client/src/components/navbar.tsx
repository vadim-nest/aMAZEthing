import '../css/navbar.css';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  const navigate = useNavigate();

  return (
    <div className='navbar'>
      <div className='navbar-start'>
        <p className='maze' onClick={() => navigate('/')}>aMAZEthing</p>
        <p className='learn' onClick={() => navigate('/learning')}>LEARN</p>
      </div>
      <div className='navbar-end'>
        <p className='login' onClick={() => navigate('/login')}>LOGIN</p>
      </div>
    </div>
  );
}

export default Navbar;
