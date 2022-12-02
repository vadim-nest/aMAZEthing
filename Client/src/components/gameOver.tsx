import { useNavigate } from 'react-router-dom';
import '../css/gameOver.css';

function GameOver ({gameStats, currentPlayer} : {
  gameStats: {
    timeRemaining: number, 
    p1Coins: number, 
    p2Coins: number, 
    p1Towers: number[],
    p2Towers: number[], 
    p1MinionCount: number, 
    p2MinionCount: number
  },
  currentPlayer: 'p1' | 'p2'
}) {

  let win = gameStats.p1Towers.length > gameStats.p2Towers.length;
  if (currentPlayer === 'p2') win = !win;
  
  const navigate = useNavigate();

  return (
    <div className={`gameOver ${win ? '' : 'lose'}`}>
      <div className='gameOverModal'>
        <div className="header">
          <h1>{win ? 'VICTORY' : 'LOSE'}</h1>
          <h2>GAME STATS</h2>
        </div>
        <div className="player">
          <h2 className={win ? 'win' : 'loser'}>You</h2>
          <div className="stats">
            <h2>Minions</h2>
            <h2 className="value">
              {currentPlayer === 'p1' ? gameStats.p1MinionCount : gameStats.p2MinionCount}
            </h2>

            <h2>GOLD</h2>
            <h2 className="value">
              {currentPlayer === 'p1' ? gameStats.p1Coins : gameStats.p2Coins}
            </h2>

            <h2>Towers</h2>
            <h2 className="value">
            {currentPlayer === 'p1' ? gameStats.p1Towers.length : gameStats.p2Towers.length}
            </h2>
          </div>
        </div>
        <div className="player">
          <h2 className={win ? 'loser' : 'win'}>Opponent</h2>
          <div className="stats">
            <h2>Minions</h2>
            <h2 className="value">
              {currentPlayer === 'p2' ? gameStats.p1MinionCount : gameStats.p2MinionCount}
            </h2>

            <h2>GOLD</h2>
            <h2 className="value">
              {currentPlayer === 'p2' ? gameStats.p1Coins : gameStats.p2Coins}
            </h2>

            <h2>Towers</h2>
            <h2 className="value">
            {currentPlayer === 'p2' ? gameStats.p1Towers.length : gameStats.p2Towers.length}
            </h2>
          </div>
        </div>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    </div>
  )
}

export default GameOver;