import React from 'react';
import '../css/minion.css';
import { minionType, TowerType } from '../utils/types';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from './svg/animalsSVG';

function Minion({boxSize, minion, setCurrentMinion, setCurrentTile, setCurrentTower}: {
  boxSize: number,
  minion: minionType,
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentTower: React.Dispatch<React.SetStateAction<null | TowerType>>
}) {

  function handleClick() {
    setCurrentTile(null);
    setCurrentTower(null);
    setCurrentMinion(minion.id);
  }

  function handleContextMenu() {
    setCurrentTile({
      xPos: minion.xPos,
      yPos: minion.yPos
    })
  }

  return (
    <div onClick={handleClick} onContextMenu={handleContextMenu}  id={`${minion.id}`} className={`minion ${minion.rotation} ${(minion.inTower && !minion.rotation)&& 'minionInTower'}`} style={{fill: `red`, height: `${boxSize + 30}px`, width: `${boxSize + 30}px`, top: `${boxSize*minion.yPos - 15}px`, left: `${boxSize*minion.xPos - 15}px`}}>
    {
      minion.type === 'Squirrel' ? <Squirrel currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Badger' ? <Badger currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Hare' ? <Hare currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Deer' ? <Deer currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Koala' ? <Koala currentPlayer={`${minion.alignment}-color`} /> :
      minion.type === 'Bear' && <Bear currentPlayer={`${minion.alignment}-color`} />
    }
  </div>
  )
}

export default Minion;
