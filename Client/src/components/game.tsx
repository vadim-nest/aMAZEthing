import '../css/game.css';
import Maze from './maze';
import GameStats from './gameStats';

function Game() {

  return (
    <>
      <div>
      <div className='gameContainer'>
        <GameStats/>
        <Maze/>
      </div>
      </div>
    </>
  );
}

export default Game;
