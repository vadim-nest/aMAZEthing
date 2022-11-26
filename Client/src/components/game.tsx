import '../css/game.css';
import Maze from './maze';
import GameStats from './gameStats';
import ToolBar from './toolbar';
import { useEffect, useState } from 'react';
import { minionType } from '../utils/types';
import { Graph, value } from '../utils/graph';
import { bFS, dijkstra, getDirection, vBFS } from '../utils/path-finding-algo';

function Game() {

  const [boxSize, setBoxSize] = useState(30);
  const [mazeCompleted, setMazeCompleted] = useState(false);
  const [minions, setMinions] = useState<{[key: number]: minionType}>({
    0: {id: 0, xPos: 1, yPos: 0, rotation: 0}, 
    1: {id: 1, xPos: 1, yPos: 0, rotation: 0}, 
    2: {id: 2, xPos: 1, yPos: 0, rotation: 0}, 
    3: {id: 3, xPos: 1, yPos: 0, rotation: 0}, 
    4: {id: 4, xPos: 2, yPos: 4, rotation: 0}
  });
  const [currentMinion, setCurrentMinion] = useState<null | number>(null);
  const [currentTile, setCurrentTile] = useState<null | {xPos:number, yPos:number}>(null);
  const [waitingForTile, setWaitingForTile] = useState(false);
  const [currentGraph, setCurrentGraph] = useState<Graph>();
  const [height, setHeight] = useState(48);
  const [width, setWidth] = useState(72);
  const [movingMinions, setMovingMinions] = useState<number[]>([]);
  const speed = 200;
  const minBoxSize = 5;
  const maxBoxSize = 100;

  function addNewMinion() {
    const newId = Object.keys(minions).length;
    setMinions(prevMinions => {
      return {
        ...prevMinions,
        [newId]: {
          id: newId,
          xPos: 0,
          yPos: 0,
          rotation: 0
        }
      }
    })
  }

  useEffect(() => {
    console.log({minions});
  }, [minions])

  useEffect(() => {
    if (currentMinion !== null) {
      console.log(currentMinion);
      setCurrentTile(null);
      setWaitingForTile(true);
    } else {
      setWaitingForTile(false);
    }
  }, [currentMinion])

  useEffect(() => {
    if (waitingForTile && currentTile !== null && currentGraph && !movingMinions.includes(currentMinion as number)) {
      setMovingMinions(prevMinions => [...prevMinions, currentMinion as number]);
      console.log('set moving')
      async function func(currentTile: {xPos: number, yPos: number}, currentGraph: Graph) {
        let minion = minions[currentMinion as number];
        console.log(minion);
        const directions = vBFS(minion.xPos + minion.yPos*width, currentTile.xPos + currentTile.yPos*width, currentGraph);
        if (directions === false) return;
        const path = [...directions.path];
        let xAdd = 0;
        let yAdd = 0;
        let previousTimeStamp: undefined | number;
        let previousDirection = minion.xPos + minion.yPos*width;
        function step(timestamp: number) {
          if (previousTimeStamp === undefined) {
            previousTimeStamp = timestamp;
          }
          if ((previousTimeStamp as number) + speed < timestamp) {
            previousTimeStamp = timestamp
            const nextDirection = path.shift() as number;
            const direction = getDirection(previousDirection as number, nextDirection as number, width);
            xAdd += direction.xPos;
            yAdd += direction.yPos;
            previousDirection = nextDirection;
            minion = minions[currentMinion as number];
            console.log(minion)
            const updatedMinion = {
              ...minion,
              moving: true,
              yPos: minion.yPos + yAdd,
              xPos: minion.xPos + xAdd
            }
            setMinions(prevMinions => {
              return {...prevMinions,
              [minion.id]: updatedMinion,}
            })
          }
          if (path.length) requestAnimationFrame(step);
          else {
            setMovingMinions(prevMoving => prevMoving.filter(id => id !== minion.id));
          }
        }
        requestAnimationFrame(step);
      }
      func(currentTile, currentGraph);
    }
  }, [currentTile])

  async function applyDirections(minion: minionType, directions: value[]) {

  }

  return (
    <>
      <div>
        <GameStats/>
        <div className='gameContainer'>
          <ToolBar setBoxSize={setBoxSize} minBoxSize={minBoxSize} maxBoxSize={maxBoxSize} currentMinion={currentMinion} currentTile={currentTile} addNewMinion={addNewMinion}/>
          <Maze boxSize={boxSize} setMazeCompleted={() => setMazeCompleted(true)} minions={Object.values(minions)} setCurrentMinion={setCurrentMinion} setCurrentTile={setCurrentTile} currentGraph={currentGraph} setCurrentGraph={setCurrentGraph} height={height} width={width}/>
        </div>
      </div>
    </>
  );
}

export default Game;
