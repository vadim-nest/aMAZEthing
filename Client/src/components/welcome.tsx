import '../css/welcome.css';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className='welcome-page'>
      <div className='top'>
        <h3 className='title' onClick={() => navigate('/')}>aMAZEthing</h3>
        <div className='smaller'>
          <h3 onClick={() => navigate('/about')}>ABOUT</h3>
          <h3 onClick={() => navigate('/login')}>LOGIN</h3>
        </div>
      </div>
      <div className='body'>
        <h1 className='welcome'>WELCOME.</h1>
        <h2 className='options' onClick={() => navigate('/game')}>PLAY</h2>
        <h2 className='options' onClick={() => navigate('/learning')}>LEARN</h2>
      </div>
    </div>
  )
}

export default Welcome;