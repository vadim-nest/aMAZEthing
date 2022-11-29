import React from 'react';
import '../css/minion.css';
import { minionType, TowerType } from '../utils/types';
import AnimalSVG from './animalsSVG';

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
      <div onClick={handleClick} onContextMenu={handleContextMenu}  id={`${minion.id}`} className={`minion ${minion.rotation} ${(minion.inTower && !minion.rotation)&& 'minionInTower'}`} style={{fill: `red`, height: `${boxSize}px`, width: `${boxSize}px`, top: `${boxSize*minion.yPos}px`, left: `${boxSize*minion.xPos}px`}}>
        <AnimalSVG />
      </div>
  )
}

export default Minion;
