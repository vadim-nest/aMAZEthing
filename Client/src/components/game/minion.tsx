import React from 'react';
import '../../css/minion.css';
import { updateCurrentMinion, updateCurrentTower } from '../../features/game_slice';
import { useAppDispatch } from '../../features/hooks';
import { minionType, TowerType } from '../../utils/types';
import { Squirrel, Badger, Hare, Deer, Koala, Bear } from '../svg/animalsSVG';

function Minion({boxSize, minion, setCurrentTile, currentPlayer}: {
  boxSize: number,
  minion: minionType,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  currentPlayer: 'p1' | 'p2'
}) {

  const dispatch = useAppDispatch();

  function handleClick() {
    if (minion.alignment === currentPlayer) {
      setCurrentTile(null);
      dispatch(updateCurrentTower(null));
      dispatch(updateCurrentMinion(minion.id));
    }
  }

  function handleContextMenu() {
    setCurrentTile({
      xPos: minion.xPos,
      yPos: minion.yPos
    })
  }

  return (
    <div onClick={handleClick} onContextMenu={handleContextMenu}  id={`${minion.id}`} className={`minion ${minion.rotation} ${(minion.inTower !== false) && 'minionInTower'}`} style={{fill: `red`, height: `${boxSize + 30}px`, width: `${boxSize + 30}px`, top: `${boxSize*minion.yPos - 15}px`, left: `${boxSize*minion.xPos - 15}px`}}>
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
