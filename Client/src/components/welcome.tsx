import '../css/welcome.css';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className='welcome-page'>
      <div className='top'>
        <p className='title' onClick={() => navigate('/')}>aMAZEthing</p>
        <div className='smaller'>
          <p onClick={() => navigate('/about')}>ABOUT</p>
          <p onClick={() => navigate('/login')}>LOGIN</p>
        </div>
      </div>
      <div className='body'>
        <h4 className='welcome'>WELCOME.</h4>
        <p className='options' onClick={() => navigate('/game')}>PLAY</p>
        <p className='options' onClick={() => navigate('/learning')}>LEARN</p>
      </div>
    </div>
  )
}

export default Welcome;