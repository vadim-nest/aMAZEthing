import '../css/toolbar.css';
import { TowerType } from '../utils/types';

function ToolBar({setBoxSize, minBoxSize, maxBoxSize, currentMinion, currentTile, addNewMinion, currentTower, allTilesHidden}: {
  setBoxSize: React.Dispatch<React.SetStateAction<number>>,  
  minBoxSize: number, 
  maxBoxSize: number,
  currentMinion: null | number,
  currentTile: null | {xPos:number, yPos:number},
  addNewMinion: () => void,
  currentTower: null | TowerType,
  allTilesHidden: boolean
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
    <div className="toolbarContainer">
      <h1>Hello</h1>
      <button onClick={()=>zoomIn(10)}>Zoom In</button>
      <button onClick={()=>zoomOut(10)}>Zoom Out</button>
      {currentMinion !== null && <h1>The current minion is {currentMinion}</h1>}
      {currentTower !== null && <div>
        <h1>The current tower is {currentTower.id}</h1>
        <h1>{currentTower.numbers.join(', ')}</h1>
        {currentTower.minion !== null && <h1>Tower contains minion {currentTower.minion}</h1>}
        </div>}
      {!allTilesHidden && <button onClick={addNewMinion}>New Minion</button>}
    </div>
  );
}

export default ToolBar;