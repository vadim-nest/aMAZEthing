import { TowerType } from "../../utils/types";
import TowerSVG from "../svg/towerSVG";
import '../../css/tower.css'
import TowerPopup from "./towerPopup";
import { useAppDispatch } from "../../features/hooks";
import { updateCurrentMinion, updateCurrentTower } from "../../features/game_slice";

function Tower({ tower, boxSize, setCurrentTile, width, height, towersSorting }: {
  tower: TowerType,
  boxSize: number,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  width: number,
  height: number,
  towersSorting: {[key: number]: number},
} ) {

  const dispatch = useAppDispatch();

  function handleContextMenu() {
    if (tower.minion === null) {
      setCurrentTile({
        xPos: tower.xPos,
        yPos: tower.yPos
      })
    }
  }

  function handleClick() {
    dispatch(updateCurrentTower(tower));
    dispatch(updateCurrentMinion(null));

  }

  return (
    <div id={`${tower.id}`} style={{width: `${boxSize*3}px`, top: `${(tower.yPos-2)*boxSize}px`, left: `${(tower.xPos-1)*boxSize}px`}} className='tower' onContextMenu={handleContextMenu} onClick={handleClick}>
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
      <TowerPopup towersSorting={towersSorting} boxSize={boxSize} tower={tower} width={width} height={height}/>
    </div>
  )
}

export default Tower;