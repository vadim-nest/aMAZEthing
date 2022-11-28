import '../css/towerPopup.css';
import { bubbleSortAlgo } from '../utils/sorting-algo';
import { bubbleSortVisual } from '../utils/sorting-helper-visual';
import { TowerType } from '../utils/types';
import Visualization from './sortingLessons/visualization';


function TowerPopup ({boxSize, tower, width, height}: {boxSize: number, tower: TowerType, width: number, height: number}) {
  return <div className={`towerPopup ${
    tower.id/width < height/4 ? 'downPopup' :
    tower.id/width > 3*height/4 ? 'upPopup' :
    width - tower.id%width < width/3 ? 'leftPopup' : 
    'rightPopup'
  }`}><Visualization array={tower.numbers} width={3*boxSize/(tower.numbers.length)} height={3*boxSize/5} animations={bubbleSortAlgo([...tower.numbers], true)} sortingAlgo={bubbleSortVisual} key={tower.numbers} clicked={true} delay={300}/></div>
}

export default TowerPopup;