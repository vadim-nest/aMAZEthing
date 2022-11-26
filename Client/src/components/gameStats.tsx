import '../css/gameStats.css';
import { useAppSelector } from '../features/hooks';

function GameStats() {
  const user  = useAppSelector((state)=>state.user);
  return (
    <div className='game-stats'>
      <div className='money-time'>
        <h3>Money:</h3><h3 className='money-count'>200</h3>
        <h3>Time remaining:</h3><h3 className='time-count'>1:29</h3>
      </div>
      <div className='scores'>
        <h3>{user.username?user.username+': ':'You: '}</h3><h3 className='score-you'>3</h3><h3>Opponent: </h3><h3 className='score-opponent'>4</h3>
      </div>
    </div>
  );
}

export default GameStats;