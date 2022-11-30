import '../css/game.css';
import Maze from './maze';
import RightBar from './rightBar';
import LeftBar from './leftBar';
import { useEffect, useState } from 'react';
import { MazeTileType, minionType, TowerType } from '../utils/types';
import { Graph, value } from '../utils/graph';
import { getDirection, vBFS, vDFS, vDijk } from '../utils/path-finding-algo';
import { bubbleSortAlgo } from '../utils/sorting-algo';
import { uniqueNamesGenerator, Config, names} from 'unique-names-generator'


const customConfig: Config = {
  dictionaries: [names]
}

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
  const [gameStats, setGameStats] = useState<{timeRemaining: number, p1Coins: number, p2Coins: number, p1Towers: number[], p2Towers: number[], p1MinionCount: number, p2MinionCount: number}>({
    timeRemaining: 300,
    p1Coins: 0,
    p2Coins: 0,
    p1Towers: [],
    p2Towers: [],
    p1MinionCount: 0,
    p2MinionCount: 0,
  });
  const array: MazeTileType[] = [];
  for (let i = 0; i < width*height; i++) {
    array.push({value: i, classes: [], path: ''})
  }

  const [counter, setCounter] = useState(300);
  useEffect(() => {
    const timer = counter > 0 && setInterval(() => {
      setGameStats(prevStats => {
        return {
          ...prevStats,
          timeRemaining: counter - 1
        }
      })
      setGameStats(prevStats => {
        return {
          ...prevStats,
          p1Coins: prevStats.p1Coins + 20*prevStats.p1Towers.length,
          p2Coins: prevStats.p2Coins + 20*prevStats.p2Towers.length,
        }
      })

      setCounter(counter - 1);
    }, 1000);
    return () => clearInterval(timer as any);
  }, [counter]);

  const [maze, setMaze] = useState(array);
  const speed = 200;
  const minBoxSize = 20;
  const maxBoxSize = 100;

  function addNewMinion(type: 'Squirrel' | 'Badger' | 'Hare' | 'Deer' | 'Koala' | 'Bear') { // TODO: Extract to minion class
    const newId = Object.keys(minions).length;
    if ((newId + 1) % 2) {
      setGameStats(prevStats => {
        return {
          ...prevStats,
          p1MinionCount: prevStats.p1MinionCount + 1
        }
      })
      setMinions(prevMinions => {
        return {
          ...prevMinions,
          [newId]: {
            id: newId,
            name: uniqueNamesGenerator(customConfig),
            xPos: 0,
            yPos: 0,
            rotation: 'minionR',
            path: [],
            alignment: 'p1',
            thoughtProcess: [],
            inTower: false,
            pathFindingAlgo: 'dijk',
            sortingAlgo: 'bubble',
            sortingSpeed: 10,
            type
          }
        }
      })
    } else {
      setGameStats(prevStats => {
        return {
          ...prevStats,
          p2MinionCount: prevStats.p2MinionCount + 1
        }
      })
      setMinions(prevMinions => {
        return {
          ...prevMinions,
          [newId]: {
            id: newId,
            name: uniqueNamesGenerator(customConfig),
            xPos: width-1,
            yPos: height-1,
            rotation: 'minionR',
            path: [],
            alignment: 'p2',
            thoughtProcess: [],
            inTower: false,
            pathFindingAlgo: 'bfs',
            sortingAlgo: 'bubble',
            sortingSpeed: 10,
            type
          }
        }
      })
    }
    setCurrentMinion(newId);
    setCurrentTower(null);
  }

  function addCoins(alignment: 'p1' | 'p2', amount: number) {
    setGameStats(prevStats => {
      if (alignment === 'p1') {
        return {
          ...prevStats,
          p1Coins: prevStats.p1Coins + amount
        }
      } else {
        return {
          ...prevStats,
          p2Coins: prevStats.p2Coins + amount
        }
      }
    })
  }

  async function moveMinion(goTo: {xPos: number, yPos: number}, comeFrom: {xPos: number, yPos: number}, currentGraph: Graph, minion: false | minionType = false, showPath = true) {
    if (!minion) minion = minions[currentMinion as number] as minionType;
    let directions : false | {
      visited: value[];
      path: value[];
    };
    if (minion.pathFindingAlgo === 'bfs') {
      directions = vBFS(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph);
    }
    else if (minion.pathFindingAlgo === 'dfs') {
      directions = vDFS(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph);
    }
    else if (minion.pathFindingAlgo === 'dijk') {
      directions = vDijk(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph)
      console.log('Dijkstra');
      console.log((directions as any));
    }
    else {
      directions = vBFS(comeFrom.xPos + comeFrom.yPos*width, goTo.xPos + goTo.yPos*width, currentGraph);
    }
    if (directions === false) return;
    const path = [...directions.path] as number[];
    const visited = [...directions.visited] as number[];

    minion = {
      ...minion,
      xPos: comeFrom.xPos,
      yPos: comeFrom.yPos,
      path: [...path],
      thoughtProcess: visited
    }

    setMinions(prevMinions => {
      return {
        ...prevMinions,
        [currentMinion as number]: minion as minionType
      }
    })
    if (showPath) setPath(minion.path, minion.thoughtProcess);
    let xAdd = 0;
    let yAdd = 0;
    let previousTimeStamp: undefined | number;
    let previousDirection = minion.xPos + minion.yPos*width;
    function step(timestamp: number) {
      if (previousTimeStamp === undefined) {
        previousTimeStamp = timestamp;
      }
      let updatedMinion = minion as minionType;
      if ((previousTimeStamp as number) + speed < timestamp) {
        previousTimeStamp = timestamp
        const nextDirection = path.shift() as number;
        const direction = getDirection(previousDirection as number, nextDirection as number, width);
        xAdd += direction.xPos;
        yAdd += direction.yPos;
        previousDirection = nextDirection;
        updatedMinion = {
          ...(minion as minionType),
          yPos: (minion as minionType).yPos + yAdd,
          xPos: (minion as minionType).xPos + xAdd,
          rotation: direction.rotation
        }
        setMinions(prevMinions => {
          return {...prevMinions,
          [(minion as minionType).id]: updatedMinion,}
        })
      }
      if (path.length) requestAnimationFrame(step);
      else {
        setMinions(prevMinions => {
          return {...prevMinions,
          [(minion as minionType).id]: {
            ...updatedMinion,
            rotation: ''
          },}
        })
        setMovingMinions(prevMoving => prevMoving.filter(id => id !== (minion as minionType).id));
        for (let tower of towers) {
          if (tower.minion === null && tower.xPos === updatedMinion.xPos && tower.yPos === updatedMinion.yPos && tower.alignment !== updatedMinion.alignment) {
            enterTower(tower.id, (minion as minionType).id);
          }
        }
      }
    }
    requestAnimationFrame(step);
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
      const minion = minions[currentMinion as number];
      moveMinion(currentTile, {xPos: minion.xPos, yPos: minion.yPos}, currentGraph);
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
    let tower = towers.find(tower => tower.id === towerId) as TowerType;
    console.log(tower.alignment);
    if (tower.alignment === 'none') {
      addCoins(minion.alignment, 200);
    }
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
    setGameStats(prevStats => {
      console.log({towerId});
      if (minion.alignment === 'p1') {
        return {
          ...prevStats,
          p2Towers: prevStats.p2Towers.filter(tower => tower !== towerId),
          p1Towers: [towerId, ...prevStats.p1Towers]
        }
      } else {
        return {
          ...prevStats,
          p1Towers: prevStats.p1Towers.filter(tower => tower !== towerId),
          p2Towers: [towerId, ...prevStats.p2Towers]
        }
      }

    })
    setMovingMinions(prevMinions => [...prevMinions, currentMinion as number]);
    tower = towers.find(tower => tower.id === towerId) as TowerType;
    if (minion.alignment === 'p1') moveMinion({xPos:0, yPos:0}, {xPos: tower.xPos, yPos:tower.yPos}, currentGraph as Graph, minion, false);
    else moveMinion({xPos:width-1, yPos:height-1}, {xPos: tower.xPos, yPos:tower.yPos}, currentGraph as Graph, minion, false);
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
            minions={minions}
            gameStats={gameStats}
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
            currentMinion={currentMinion}
            setCurrentMinion={setCurrentMinion}
            minions={minions}
          />
        </div>
      </div>
    </>
  );
}

export default Game;
