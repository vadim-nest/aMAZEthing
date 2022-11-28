import { TowerType } from "../utils/types";
import TowerSVG from "./towerSVG";
import '../css/tower.css'

function Tower({ xPos, yPos, color, boxSize }: TowerType & {boxSize: number} ) {
  return (
    <div style={{width: `${boxSize*3}px`, top: `${(yPos-3)*boxSize}px`, left: `${(xPos-1)*boxSize}px`}} className="tower">
      <TowerSVG playerClass="neutralTower" playerClassShadow="neutralTowerShadow"/>
    </div>
  )
}

export default Tower;