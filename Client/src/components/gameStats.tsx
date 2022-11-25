import '../css/gameStats.css';

function GameStats() {
  return (
    <div className='game-stats'>
      <h3 className='money'>Money: {}</h3>
      <h3 className='time'>Time remaining: {}</h3>
      <h3 className='score'>Score</h3>
      <h3></h3>
    </div>
  );
}

export default GameStats;