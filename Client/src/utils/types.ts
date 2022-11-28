import { value } from "./graph";

export interface minionType {
  id: number;
  xPos: number;
  yPos: number;
  rotation: 'minionR' | 'minionL' | 'minionU' | 'minionD' | '';
  path: number[];
  thoughtProcess: number[];
}

export interface MazeTileType {
  value: value, 
  classes: ('b' | 't' | 'l' | 'r')[], 
  path: '' | 'THOUGHTPROCESS' | 'PATH'
}

export interface TowerType {
  id: number,
  xPos: number,
  yPos: number,
  numbers: number[],
  color: 'red' | 'blue'
}