import '../css/game.css';
import Maze from './maze';
import GameStats from './gameStats';
import ToolBar from './toolbar';
import { useState } from 'react';
import { minionType } from '../utils/types';

function Game() {

  const [boxSize, setBoxSize] = useState(30);
  const [mazeCompleted, setMazeCompleted] = useState(false);
  const [minions, setMinions] = useState<minionType[]>([{id: 0, xPos: 1, yPos: 0}, {id: 4, xPos: 2, yPos: 4}]);
  const [currentMinion, setCurrentMinion] = useState<null | number>(null);
  const [currentTile, setCurrentTile] = useState<null | {xPos:number, yPos:number}>(null);
  const minBoxSize = 5;
  const maxBoxSize = 100;

  return (
    <>
      <div>
        <GameStats/>
        <div className='gameContainer'>
          <ToolBar setBoxSize={setBoxSize} minBoxSize={minBoxSize} maxBoxSize={maxBoxSize} currentMinion={currentMinion} currentTile={currentTile}/>
          <Maze boxSize={boxSize} setMazeCompleted={() => setMazeCompleted(true)} minions={minions} setCurrentMinion={setCurrentMinion} setCurrentTile={setCurrentTile}/>
        </div>
      </div>
    </>
  );
}

export default Game;
