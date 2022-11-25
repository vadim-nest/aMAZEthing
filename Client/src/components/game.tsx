import '../css/game.css';
import Maze from './maze';

function Game() {

  return (
    <>
      <div>
      <div className='gameContainer'>
        <h1>game</h1>
        <Maze/>
      </div>
      </div>
    </>
  );
}

export default Game;
