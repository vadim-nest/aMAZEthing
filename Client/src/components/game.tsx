import '../css/game.css';
import Maze from './maze';
import GameStats from './gameStats';
import ToolBar from './toolbar';
import { useState } from 'react';

function Game() {

  const [boxSize, setBoxSize] = useState(50);
  const minBoxSize = 5;
  const maxBoxSize = 100;

  return (
    <>
      <div>
        <GameStats/>
        <div className='gameContainer'>
          <ToolBar setBoxSize={setBoxSize} minBoxSize={minBoxSize} maxBoxSize={maxBoxSize}/>
          <Maze boxSize={boxSize}/>
        </div>
      </div>
    </>
  );
}

export default Game;
