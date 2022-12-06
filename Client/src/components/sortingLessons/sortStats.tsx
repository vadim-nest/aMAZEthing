function MapKeys({ animations }: { animations: any }) {
    let swaps:number;
    
  return (
    <div className="sort-keys">
      <h2>Summary</h2>
      <div className="flex-row">
        <h5>Average Complexity:</h5>
        <h4>O(n)</h4>
      </div>
      <div className="flex-row">
        <h5>Best Complexity:</h5>
        <h4>O(n)</h4>
      </div>
      <div className="flex-row">
        <h5>Worst Complexity:</h5>
        <h4>O(n)</h4>
      </div>
      <div className="flex-row">
        <h5>Space complexity:</h5>
        <h4>O(n)</h4>
      </div>

      <div className="stats-flex">
                <div className="flex-row">
                    <h4>Iterations:</h4>
                    <h4>{animations.length}</h4>
                </div>
                <div className="flex-row">
                    <h4>Swaps Made</h4>
                    <h4>{}</h4>
                </div>
            </div>
      
    </div>
  );
}

export default MapKeys;
