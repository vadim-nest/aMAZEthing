import '../css/game.css';
import Maze from './maze';
import GameStats from './gameStats';

function Game() {

  return (
    <>
      <div>
        <GameStats/>
        <div className='gameContainer'>
          <Maze/>
        </div>
      </div>
    </>
  );
}

export default Game;
