import '../css/toolbar.css';

function ToolBar({setBoxSize, minBoxSize, maxBoxSize}: {setBoxSize: React.Dispatch<React.SetStateAction<number>>, minBoxSize: number, maxBoxSize: number}) {
  
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
    </div>
  );
}

export default ToolBar;