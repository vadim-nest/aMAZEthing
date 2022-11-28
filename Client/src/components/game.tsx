import '../css/game.css';
import Maze from './maze';
import GameStats from './gameStats';
import ToolBar from './toolbar';
import { useEffect, useState } from 'react';
import { MazeTileType, minionType, TowerType } from '../utils/types';
import { Graph, value } from '../utils/graph';
import { bFS, dijkstra, getDirection, vBFS } from '../utils/path-finding-algo';

function Game() { // TODO: Extract logic to maze class

  const [boxSize, setBoxSize] = useState(20);
  const [mazeCompleted, setMazeCompleted] = useState(false);
  const [minions, setMinions] = useState<{[key: number]: minionType}>({});
  const [currentMinion, setCurrentMinion] = useState<null | number>(null);
  const [currentTile, setCurrentTile] = useState<null | {xPos:number, yPos:number}>(null);
  const [waitingForTile, setWaitingForTile] = useState(false);
  const [currentGraph, setCurrentGraph] = useState<Graph>();
  const [height, setHeight] = useState(48);
  const [width, setWidth] = useState(72);
  const [movingMinions, setMovingMinions] = useState<number[]>([]);
  const [towers, setTowers] = useState<TowerType[]>([]);
  const array: MazeTileType[] = [];
  for (let i = 0; i < width*height; i++) {
    array.push({value: i, classes: [], path: ''})
  }

  const [maze, setMaze] = useState(array);
  const speed = 200;
  const minBoxSize = 5;
  const maxBoxSize = 100;

  function addNewMinion() { // TODO: Extract to minion class
    const newId = Object.keys(minions).length;
    setMinions(prevMinions => {
      return {
        ...prevMinions,
        [newId]: {
          id: newId,
          xPos: 0,
          yPos: 0,
          rotation: 0,
          path: [],
          thoughtProcess: []
        }
      }
    })
    setCurrentMinion(newId);
  }

  useEffect(() => {
    console.log('hello');
    setPath([], []);
    if (currentMinion !== null && !movingMinions.includes(currentMinion as number)) {
      console.log(currentMinion);
      setCurrentTile(null);
      setWaitingForTile(true);
    } else if (currentMinion !== null) {
      const minion = minions[currentMinion as number];
      setPath(minion.path, minion.thoughtProcess);
    } else {
      setWaitingForTile(false);
    }
  }, [currentMinion])

  function setPath(path: number[], visited: number[]) {
    console.log('Setting path:', path, visited)
    setMaze(prevMaze => {
      const newMaze = [...prevMaze];
      for (let i = 0; i < newMaze.length; i++) {
        if (path.includes(i)) newMaze[i].path = 'PATH';
        else if (visited.includes(i)) newMaze[i].path = 'THOUGHTPROCESS';
        else newMaze[i].path = '';
      }
      return newMaze;
    });
  }

  useEffect(() => { // TODO: Extract to a new file
    if (waitingForTile && currentTile !== null && currentGraph && !movingMinions.includes(currentMinion as number)) {
      setMovingMinions(prevMinions => [...prevMinions, currentMinion as number]);
      async function func(currentTile: {xPos: number, yPos: number}, currentGraph: Graph) {
        let minion = minions[currentMinion as number];
        console.log(minion);
        const directions = vBFS(minion.xPos + minion.yPos*width, currentTile.xPos + currentTile.yPos*width, currentGraph);
        if (directions === false) return;
        const path = [...directions.path] as number[];
        const visited = [...directions.visited] as number[];

        minion = {
          ...minion,
          path: [...path],
          thoughtProcess: visited
        }
        setMinions(prevMinions => {
          return {
            ...prevMinions,
            [currentMinion as number]: minion
          }
        })
        setPath(minion.path, minion.thoughtProcess);
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

  useEffect(() => {
    console.log({towers});
  }, [towers])

  return (
    <>
      <div>
        <GameStats/>
        <div className='gameContainer'>
          <ToolBar setBoxSize={setBoxSize} minBoxSize={minBoxSize} maxBoxSize={maxBoxSize} currentMinion={currentMinion} currentTile={currentTile} addNewMinion={addNewMinion}/>
          <Maze maze={maze} setMaze={setMaze} towers={towers} setTowers={setTowers} boxSize={boxSize} setMazeCompleted={() => setMazeCompleted(true)} minions={Object.values(minions)} setCurrentMinion={setCurrentMinion} setCurrentTile={setCurrentTile} currentGraph={currentGraph} setCurrentGraph={setCurrentGraph} height={height} width={width}/>
        </div>
      </div>
    </>
  );
}

export default Game;
