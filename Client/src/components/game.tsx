import '../css/game.css';
import Maze from './maze';
import RightBar from './rightBar';
import LeftBar from './leftBar';
import { useEffect, useState } from 'react';
import { MazeTileType, minionType, TowerType } from '../utils/types';
import { Graph, value } from '../utils/graph';
import { bFS, dijkstra, getDirection, vBFS } from '../utils/path-finding-algo';
import { bubbleSortAlgo } from '../utils/sorting-algo';

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
  const [towersSorting, setTowersSorting] = useState<{[key: number]: number}>({});
  const array: MazeTileType[] = [];
  for (let i = 0; i < width*height; i++) {
    array.push({value: i, classes: [], path: ''})
  }

  const [maze, setMaze] = useState(array);
  const speed = 10;
  const minBoxSize = 20;
  const maxBoxSize = 100;

  function addNewMinion(type: 'Squirrel' | 'Badger' | 'Hare' | 'Deer' | 'Koala' | 'Bear') { // TODO: Extract to minion class
    const newId = Object.keys(minions).length;
    if ((newId + 1) % 2) {
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
            sortingAlgo: 'bubble',
            sortingSpeed: 500,
            type
          }
        }
      })
    } else {
      console.log('other Minion')
      setMinions(prevMinions => {
        return {
          ...prevMinions,
          [newId]: {
            id: newId,
            xPos: width-1,
            yPos: height-1,
            rotation: 'minionR',
            path: [],
            alignment: 'p2',
            thoughtProcess: [],
            inTower: false,
            pathFindingAlgo: 'bfs',
            sortingAlgo: 'bubble',
            sortingSpeed: 500,
            type
          }
        }
      })
    }
    setCurrentMinion(newId);
    setCurrentTower(null);
  }

  useEffect(() => {
    setPath([], []);
    if (currentMinion !== null && !movingMinions.includes(currentMinion as number)) {
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
              if (tower.minion === null && tower.xPos === updatedMinion.xPos && tower.yPos === updatedMinion.yPos && tower.alignment !== updatedMinion.alignment) {
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

  async function enterTower(towerId: number, minionId: number) {
    setTowersSorting(prevTowerSorting => {
      const newTowerSorting = {
        ...prevTowerSorting,
        [towerId]: 0
      }
      return newTowerSorting;
    })
    setTowers(prevTowers => {
      const minion = minions[minionId];
      const newTowers = [...prevTowers];
      return newTowers.map(tower => {
        if (towerId !== tower.id) return tower;
        else {
          let animations = bubbleSortAlgo([...tower.numbers], minion.alignment === 'p1');
          return {
          ...tower,
          minion: minion.id,
          minionAlignment: minion.alignment,
          minionSortingSpeed: minion.sortingSpeed,
          animations: animations
          }
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
      setCurrentMinion(null);
    };
    const minion = minions[minionId];
    const tower = towers.find(tower => tower.id === towerId) as TowerType;
    let animations = bubbleSortAlgo([...tower.numbers], minion.alignment === 'p1');
    let array = tower.numbers;
    await new Promise((resolve, reject) => {
      const interval = setInterval(()=>{
        const currentAnimation = animations.shift();
        if (animations.length === 0) {
          clearInterval(interval);
          resolve(true);
        };
        if (currentAnimation && currentAnimation.length === 4) {
          console.log('changing array')
          let temp = array[currentAnimation[0]];
          array[currentAnimation[0]] = array[currentAnimation[2]];
          array[currentAnimation[2]] = temp;
        }
        if (towersSorting[towerId] === 0) {
          console.log('towerId', towersSorting, towersSorting[towerId])
          setTowers(prevTowers => {
            const newTowers = [...prevTowers];
            return newTowers.map(tower => {
              if (tower.id !== towerId) return tower;
              else {
                if (currentAnimation && currentAnimation.length === 4) {
                  return {
                    ...tower,
                    animations,
                    numbers: array
                  }
                } else return {
                  ...tower,
                  animations,
                }
              }
            })
          });
        }
      }, minion.sortingSpeed*2);
    })
    exitTower(towerId, minionId);
  }

  function exitTower(towerId: number, minionId: number) {
    let minion = minions[minionId];
    setTowersSorting(prevTowerSorting => {
      const newTowerSorting = {
        ...prevTowerSorting,
        [towerId]: 0
      }
      return newTowerSorting;
    })
    setTowers(prevTowers => {
      const newTowers = [...prevTowers];
      return newTowers.map(tower => {
        if (towerId !== tower.id) return tower;
        else return {
          ...tower,
          minion: null,
          alignment: minion.alignment
        }
      })
    })
    setMinions(prevMinions => {
      minion = prevMinions[minionId]
      return {
        ...prevMinions,
        [minionId]: {
          ...minion,
          yPos: minion.yPos + 1,
          inTower: false
        }
      }
    })
    let old;
  }

  useEffect(() => {
    if (Object.keys(towersSorting).some(towerId=>{
      if (currentTower === null || Number(towerId) !== currentTower.id) {
        return towersSorting[Number(towerId)] > 0
      }
    })) {
      setTowersSorting(prevTowersSorting => {
        let newTowersSorting: {[key: number]: number} = {};
        for (let key of Object.keys(prevTowersSorting)) {
          if (currentTower === null || Number(key) !== currentTower.id) newTowersSorting[Number(key)] = 0;
        }
        return newTowersSorting;
      });
    }
  }, [currentTower])

  useEffect(() => {
    console.log(towersSorting);
  }, [towersSorting])

  return (
    <>
      <div>
        <div className='gameContainer'>
          {/* Need to rename the components, but for now: ToolBar is on the left, GameStats is on the right */}
          <LeftBar
            setBoxSize={setBoxSize}
            setCurrentTower={setCurrentTower}
            currentTower={currentTower}
            minBoxSize={minBoxSize}
            maxBoxSize={maxBoxSize}
            currentMinion={currentMinion}
            currentTile={currentTile}
            />
          <Maze
            maze={maze}
            setMaze={setMaze}
            towers={towers}
            towersSorting={towersSorting}
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
          <RightBar
            addNewMinion={addNewMinion}
            allTilesHidden={allTilesHidden}
          />
        </div>
      </div>
    </>
  );
}

export default Game;
