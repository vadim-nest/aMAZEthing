import { value } from "./graph";

export interface minionType {
  id: number;
  xPos: number;
  yPos: number;
  rotation: 'minionR' | 'minionL' | 'minionU' | 'minionD' | '';
  path: number[];
  alignment: 'p1' | 'p2';
  thoughtProcess: number[];
  inTower: false | number;
  pathFindingAlgo: 'dfs' | 'bfs' | 'dijk' | 'a*';
  sortingAlgo: 'bubble' | 'insertion' | 'selection' | 'merge' | 'quick';
  sortingSpeed: number;
  type: 'Squirrel' | 'Badger' | 'Hare' | 'Deer' | 'Koala' | 'Bear'
}

export interface MazeTileType {
  value: value, 
  classes: ('b' | 't' | 'l' | 'r')[], 
  path: '' | 'THOUGHTPROCESS' | 'PATH'
}

export interface TowerType {
  id: number;
  xPos: number;
  yPos: number;
  numbers: number[];
  color: 'red' | 'blue';
  minion: null | number;
  minionAlignment: null | 'p1' | 'p2';
  minionSortingSpeed: null | number;
  alignment: 'none' | 'p1' | 'p2';
  animations: number[][]
}