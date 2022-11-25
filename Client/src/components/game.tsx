import '../css/game.css';
import Maze from './maze';
import Navbar from './navbar';


function Game() {

  return (
    <>
      <Navbar />
      <div>
        <h1>game</h1>
        <Maze/>
      </div>
    </>
  );
}

export default Game;
