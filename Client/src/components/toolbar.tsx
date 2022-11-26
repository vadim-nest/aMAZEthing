import '../css/toolbar.css';

function ToolBar({setBoxSize, minBoxSize, maxBoxSize, currentMinion, currentTile, addNewMinion}: {
  setBoxSize: React.Dispatch<React.SetStateAction<number>>,  
  minBoxSize: number, 
  maxBoxSize: number,
  currentMinion: null | number,
  currentTile: null | {xPos:number, yPos:number},
  addNewMinion: () => void
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
      <button onClick={addNewMinion}>New Minion</button>
    </div>
  );
}

export default ToolBar;