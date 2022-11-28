import '../css/leftBar.css';
import { TowerType } from '../utils/types';
import FlagSVG from './flagSVG';

function LeftBar({setBoxSize, minBoxSize, maxBoxSize, currentMinion, currentTile, currentTower}: {
  setBoxSize: React.Dispatch<React.SetStateAction<number>>,
  minBoxSize: number,
  maxBoxSize: number,
  currentMinion: null | number,
  currentTile: null | {xPos:number, yPos:number},
  currentTower: null | TowerType
}) {

  function zoomIn(amount: number) {
    setBoxSize(oldBoxSize => {
      if (oldBoxSize + amount > maxBoxSize) return maxBoxSize;
      return oldBoxSize + amount;
    })
  }

  function zoomOut(amount: number) {
    setBoxSize(oldBoxSize => {
      if (oldBoxSize - amount < minBoxSize) return minBoxSize;
      return oldBoxSize - amount;
    })
  }

  return(
    <div className="leftBarContainer">
      <div className='flags'>
      <h1 className='p1Name'>You</h1>
      <div className='p1Flag'>
        <FlagSVG playerClass='p1FlagColor'/>
      </div>
        <h1 className='p2Name'>Isaac</h1>
        <div className='p2Flag'>
          <FlagSVG playerClass='p2FlagColor'/>
        </div>
      </div>
      <button onClick={()=>zoomIn(10)}>Zoom In</button>
      <button onClick={()=>zoomOut(10)}>Zoom Out</button>
      {currentMinion !== null && <h1>The current minion is {currentMinion}</h1>}
      {currentTower !== null && <div>
        <h1>The current tower is {currentTower.id}</h1>
        <h1>{currentTower.numbers.join(', ')}</h1>
        {currentTower.minion !== null && <h1>Tower contains minion {currentTower.minion}</h1>}
        </div>}
    </div>
  );
}

export default LeftBar;