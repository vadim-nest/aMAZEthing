import '../css/welcome.css';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Hello</h1>
    </div>
  )
}

export default Welcome;