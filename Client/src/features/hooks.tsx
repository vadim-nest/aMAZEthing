import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import minion from '../components/game/minion';
import {
  Squirrel,
  Badger,
  Hare,
  Deer,
  Koala,
  Bear,
} from '../components/svg/animalsSVG';
import TowerSVG from '../components/svg/towerSVG';
import { Graph, value } from '../utils/graph';
import {
  aStar,
  distanceConstruct,
  vBFS,
  vDFS,
  vDijk,
} from '../utils/path-finding-algo';
import {
  bubbleSortAlgo,
  insertionSortAlgo,
  mergeSortAlgo,
  quickSortAlgo,
  selectionSortAlgo,
} from '../utils/sorting-algo';
import { minionType } from '../utils/types';
import { RootState, AppDispatch } from './store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
//adding types to functions
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useAlgo(
  algoName: string = 'bubble',
  array: any = [],
  reversed: boolean = false
) {
  switch (algoName) {
    case 'bubble':
      return bubbleSortAlgo(array, reversed);
    case 'insertion':
      return insertionSortAlgo(array, reversed);
    case 'selection':
      return selectionSortAlgo(array, reversed);
    case 'merge':
      return mergeSortAlgo(array, reversed);
    case 'quick':
      return quickSortAlgo(array, reversed);
  }
  return [[]];
}

export function whichAnimalSVG(
  minion:
    | minionType
    | {
        type: 'Squirrel' | 'Badger' | 'Hare' | 'Deer' | 'Koala' | 'Bear';
        alignment: 'p1' | 'p2' | 'neutral';
      }
) {
  return minion.type === 'Squirrel' ? (
    <Squirrel currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Badger' ? (
    <Badger currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Hare' ? (
    <Hare currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Deer' ? (
    <Deer currentPlayer={`${minion.alignment}-color`} />
  ) : minion.type === 'Koala' ? (
    <Koala currentPlayer={`${minion.alignment}-color`} />
  ) : (
    minion.type === 'Bear' && (
      <Bear currentPlayer={`${minion.alignment}-color`} />
    )
  );
}

export function usePathAlgo(
  pathFindingAlgo: 'bfs' | 'dfs' | 'dijk' | 'a*',
  comeFrom: { xPos: number; yPos: number },
  goTo: { xPos: number; yPos: number },
  currentGraph: Graph,
  width: number
) {
  let directions: false | { visited: value[]; path: value[] } = false;
  if (pathFindingAlgo === 'bfs') {
    directions = vBFS(
      comeFrom.xPos + comeFrom.yPos * width,
      goTo.xPos + goTo.yPos * width,
      currentGraph
    );
  } else if (pathFindingAlgo === 'dfs') {
    directions = vDFS(
      comeFrom.xPos + comeFrom.yPos * width,
      goTo.xPos + goTo.yPos * width,
      currentGraph
    );
  } else if (pathFindingAlgo === 'dijk') {
    directions = vDijk(
      comeFrom.xPos + comeFrom.yPos * width,
      goTo.xPos + goTo.yPos * width,
      currentGraph
    );
  } else if (pathFindingAlgo === 'a*') {
    directions = aStar(
      comeFrom.xPos + comeFrom.yPos * width,
      goTo.xPos + goTo.yPos * width,
      currentGraph,
      distanceConstruct(width)
    );
  } else {
    directions = vBFS(
      comeFrom.xPos + comeFrom.yPos * width,
      goTo.xPos + goTo.yPos * width,
      currentGraph
    );
  }
  return directions;
}

export function useTutorial(step: number = 1) {
  switch (step) {
    case 1:
      return (
        <>
          <h1>Welcome to aMAZEthing</h1>
          <h2>Here you can play and learn about the game.</h2>
          <p>
            Click <b>next</b> to learn more or <b>skip</b> to start playing
          </p>
          <img
            className="tutorial-img"
            src="./src/assets/tutorial/maze.png"
          ></img>
        </>
      );
    case 2:
      return (
        <>
          <h1>Buying an Animal</h1>
          <h2>Open the shop to buy an animal</h2>
          <p>
            Each animal has different <i>path finding</i> and <i>sorting</i>{' '}
            algorithms. Head to our <a>learning section</a> to find out more{' '}
          </p>
          <img src="./src/assets/tutorial/shop.png"></img>
          <img
            className="tutorial-img"
            src="./src/assets/tutorial/buy-minion.png"
          ></img>
        </>
      );
    case 3:
      return (
        <>
          <h1>Move your animals through the maze</h1>
          <h2>
            Select an animal with left-click and the destination with a
            right-click
          </h2>
          <p>You will see the animal's thought process before they set off</p>
          <img
            className="tutorial-img"
            src="./src/assets/tutorial/think-process.gif"
          ></img>
        </>
      );
    case 4:
      return (
        <>
          <h1>Towers</h1>
          <h2>To win a game you must conquer the most towers</h2>
          <p>
            Each tower has an unsorted set of numbers. To conquer a tower, send
            an animal to sort it.{' '}
          </p>
          <p>Once sorted, the animal will return to the home base</p>
          <img
            className="tutorial-img"
            src="./src/assets/tutorial/tower-sorting.gif"
          ></img>
          <div className="flex-div">
            <TowerSVG playerClass={'p1Tower'} />
            <TowerSVG playerClass={'p2Tower'} />
          </div>
        </>
      );
    case 5:
      return (
        <>
          <h1>Trees</h1>
          <h2>Trees act as obstacles and will slow animals down.</h2>
          <p>
            Animals with more advanced path finding algorithms will try to avoid
            them
          </p>
          <img
            className="tutorial-img"
            src="./src/assets/tutorial/tree-obstacle.gif"
          ></img>
        </>
      );
  }
}
