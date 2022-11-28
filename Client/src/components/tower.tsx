import { TowerType } from "../utils/types";
import TowerSVG from "./towerSVG";
import '../css/tower.css'

function Tower({ tower, boxSize, setCurrentTile, setCurrentTower, setCurrentMinion }: {
  tower: TowerType,
  boxSize: number,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentTower: React.Dispatch<React.SetStateAction<null | TowerType>>,
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
} ) {

  function handleContextMenu() {
    setCurrentTile({
      xPos: tower.xPos,
      yPos: tower.yPos
    })
  }

  function handleClick() {
    setCurrentTower(tower)
    setCurrentMinion(null);
  }

  return (
    <div style={{width: `${boxSize*3}px`, top: `${(tower.yPos-2)*boxSize}px`, left: `${(tower.xPos-1)*boxSize}px`}} className='tower' onContextMenu={handleContextMenu} onClick={handleClick}>
      <TowerSVG playerClass={
                  tower.minion !== null? 'contestedTower' :
                  tower.alignment === 'p1' ? 'p1Tower' :
                  tower.alignment === 'p2' ? 'p2Tower' :
                  'neutralTower'} 
                playerClassShadow={
                  tower.minion !== null ? 'contestedTowerShadow' :
                  tower.alignment === 'p1' ? 'p1TowerShadow' :
                  tower.alignment === 'p2' ? 'p2TowerShadow' :
                  'neutralTowerShadow'}
      />
    </div>
  )
}

export default Tower;