import '../css/welcome.css';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className='welcome-page'>
      <h1 className='welcome'>WELCOME.</h1>
      <button className='options' onClick={() => navigate('/game')}>PLAY</button>
      <br/>
      <button className='options' onClick={() => navigate('/learning')}>LEARN</button>
    </div>
  )
}

export default Welcome;