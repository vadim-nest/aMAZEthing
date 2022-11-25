import { useEffect } from "react";
import { Graph } from "../utils/graph";
import '../css/maze.css';
import MazeTile from "./mazeTile";

function Maze() {

  // TODO: Set as state
  
  let width = 72;
  let height = 48;
  let boxSize = 50; 

  let maze = Array(height).fill(Array(width).fill({value: '', classes: ['b']}));

  useEffect(() => {
    console.log(maze);
  },[])

  return (
    <>
      <div className="mazeOuter">
        <div className="mazeInner" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
        {maze.map(row => {
          return row.map((value: {value: string, classes: string[]}) => <MazeTile value={value.value} classes={value.classes} boxSize={boxSize}/>)
        })}
        </div>
      </div>
    </>
  );
}

export default Maze;