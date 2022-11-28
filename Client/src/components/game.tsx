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
  const [currentTower, setCurrentTower] = useState<null | TowerType>(null);
  const [waitingForTile, setWaitingForTile] = useState(false);
  const [currentGraph, setCurrentGraph] = useState<Graph>();
  const [height, setHeight] = useState(40);
  const [width, setWidth] = useState(86);
  const [movingMinions, setMovingMinions] = useState<number[]>([]);
  const [towers, setTowers] = useState<TowerType[]>([]);
  const [allTilesHidden, setAllTilesHidden] = useState(true);
  const array: MazeTileType[] = [];
  for (let i = 0; i < width*height; i++) {
    array.push({value: i, classes: [], path: ''})
  }

  const [maze, setMaze] = useState(array);
  const speed = 200;
  const minBoxSize = 20;
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
          rotation: 'minionR',
          path: [],
          alignment: 'p1',
          thoughtProcess: [],
          inTower: false,
          pathFindingAlgo: 'bfs',
          sortingAlgo: 'bubble'
        }
      }
    })
    setCurrentMinion(newId);
    setCurrentTower(null);
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
          let updatedMinion: minionType = minion;
          if ((previousTimeStamp as number) + speed < timestamp) {
            previousTimeStamp = timestamp
            const nextDirection = path.shift() as number;
            const direction = getDirection(previousDirection as number, nextDirection as number, width);
            xAdd += direction.xPos;
            yAdd += direction.yPos;
            previousDirection = nextDirection;
            updatedMinion = {
              ...minion,
              yPos: minion.yPos + yAdd,
              xPos: minion.xPos + xAdd,
              rotation: direction.rotation
            }
            setMinions(prevMinions => {
              return {...prevMinions,
              [minion.id]: updatedMinion,}
            })
          }
          if (path.length) requestAnimationFrame(step);
          else {
            setMinions(prevMinions => {
              return {...prevMinions,
              [minion.id]: {
                ...updatedMinion,
                rotation: ''
              },}
            })
            setMovingMinions(prevMoving => prevMoving.filter(id => id !== minion.id));
            for (let tower of towers) {
              console.log('Checking tower', tower.id)
              if (tower.minion === null && tower.xPos === updatedMinion.xPos && tower.yPos === updatedMinion.yPos) {
                console.log('Success:', tower.id, minion.id)
                enterTower(tower.id, minion.id);
              }
            }
          }
        }
        requestAnimationFrame(step);
      }
      func(currentTile, currentGraph);
    }
  }, [currentTile])

  function enterTower(towerId: number, minionId: number) {
    setTowers(prevTowers => {
      const newTowers = [...prevTowers];
      return newTowers.map(tower => {
        if (towerId !== tower.id) return tower;
        else return {
          ...tower,
          minion: minionId
        }
      })
    })
    setMinions(prevMinions => {
      const minion = prevMinions[minionId];
      return {
        ...prevMinions,
        [minionId]: {
          ...minion,
          yPos: minion.yPos - 1,
          inTower: towerId
        }
      }
    })
    if (currentMinion === minionId) {
      console.log({currentMinion, minionId})
      setCurrentMinion(null);
    };
  }

  function exitTower(towerId: number, minionId: number) {
    setTowers(prevTowers => {
      const newTowers = [...prevTowers];
      return newTowers.map(tower => {
        if (towerId !== tower.id) return tower;
        else return {
          ...tower,
          minion: null
        }
      })
    })
    setMinions(prevMinions => {
      const minion = prevMinions[minionId];
      return {
        ...prevMinions,
        [minionId]: {
          ...minion,
          yPos: minion.yPos - 1,
          inTower: false
        }
      }
    })
  }


  useEffect(() => {
    console.log({towers});
  }, [towers])

  return (
    <>
      <div>
        <GameStats/>
        <div className='gameContainer'>
          <ToolBar 
            setBoxSize={setBoxSize} 
            currentTower={currentTower} 
            minBoxSize={minBoxSize} 
            maxBoxSize={maxBoxSize} 
            currentMinion={currentMinion} 
            currentTile={currentTile} 
            addNewMinion={addNewMinion}
            allTilesHidden={allTilesHidden}
          />
          <Maze 
            maze={maze} 
            setMaze={setMaze} 
            towers={towers} 
            setTowers={setTowers} 
            currentTower={currentTower} 
            setCurrentTower={setCurrentTower} 
            boxSize={boxSize} 
            setMazeCompleted={() => setMazeCompleted(true)} 
            minions={Object.values(minions)} 
            setCurrentMinion={setCurrentMinion} 
            setCurrentTile={setCurrentTile} 
            currentGraph={currentGraph} 
            setCurrentGraph={setCurrentGraph} 
            height={height} 
            width={width}
            allTilesHidden={allTilesHidden}
            setAllTilesHidden={setAllTilesHidden}
          />
        </div>
      </div>
    </>
  );
}

export default Game;
