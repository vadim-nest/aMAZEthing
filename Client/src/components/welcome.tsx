import '../css/welcome.css';
import { useNavigate } from 'react-router-dom';
import MediaQuery from 'react-responsive';

function Welcome() {

  const navigate = useNavigate();

  return (
    <div className='welcome-page'>
      <MediaQuery minWidth={951}>
        <h1 className='welcome'>WELCOME.</h1>
        <button className='options' onClick={() => navigate('/waitingRoom')}>PLAY</button>
        <button className='options' onClick={() => navigate('/learning')}>LEARN</button>
      </MediaQuery>
      <MediaQuery maxWidth={951} minWidth={651}>
        <div className='medium'>
          <h1 className='welcome-medium'>WELCOME.</h1>
          <button className='options-medium' onClick={() => navigate('/waitingRoom')}>PLAY</button>
          <button className='options-medium' onClick={() => navigate('/learning')}>LEARN</button>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={650}>
        <div className='small'>
          <h1 className='welcome-small'>WEL</h1><h1 className='welcome-small'>COME.</h1>
          <button className='options-small' onClick={() => navigate('/waitingRoom')}>PLAY</button>
          <button className='options-small' onClick={() => navigate('/learning')}>LEARN</button>
        </div>
      </MediaQuery>
    </div>
  )
}

export default Welcome;