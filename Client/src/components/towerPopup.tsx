import '../css/towerPopup.css';
import { bubbleSortAlgo } from '../utils/sorting-algo';
import { bubbleSortVisual } from '../utils/sorting-helper-visual';
import { minionType, TowerType } from '../utils/types';
import Visualization from './sortingLessons/visualization';


function TowerPopup ({boxSize, tower, width, height, towersSorting, visible}: {boxSize: number, tower: TowerType, width: number, height: number, towersSorting: {[key: number]: number}, visible: boolean}) {
  console.log(tower.animations);
  return <div className={`towerPopup ${
    tower.id/width < height/4 ? 'downPopup' :
    tower.id/width > 3*height/4 ? 'upPopup' :
    width - tower.id%width < width/3 ? 'leftPopup' : 
    'rightPopup'
  }`
  }>
    <Visualization array={tower.numbers} width={3*boxSize/5} margin={2} height={3*boxSize/5} animations={tower.animations} sortingAlgo={bubbleSortVisual} key={tower.numbers} clicked={tower.minion !== null && !towersSorting[tower.id]++} delay={tower.minionSortingSpeed} tower={tower.id}/>
  </div>
}

export default TowerPopup;