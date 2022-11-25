import '../css/welcome.css';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div className='welcome'>
      <div className='top'>
        <p className='title'>aMAZEthing</p>
        <div className='smaller'>
          <p>ABOUT</p>
          <p>LOGIN</p>
        </div>
        
      </div>
      <div>

      </div>
    </div>
    
  )
}

export default Welcome;