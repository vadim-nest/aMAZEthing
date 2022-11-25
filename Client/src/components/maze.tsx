import { useEffect, useState } from "react";
import '../css/maze.css';
import { Graph, value } from "../utils/graph";
import { generateMaze } from "../utils/maze";
import MazeTile from "./mazeTile";

function Maze() {

  // TODO: Set as state

  let width = 72;
  let height = 48;
  let boxSize = 15; 

  const [maze, setMaze] = useState(Array(height * width).fill({value: '', classes: []}));
  const [displayVisited, setDisplayVisited] = useState<value[]>([]);
  const [displayClasses, setDisplayClasses] = useState<{[key: value]: string[]}>({});
  let currentGraph: Graph;
  let mazeGenerated = false;

  useEffect(() => {
    if (mazeGenerated === false) {
      mazeGenerated = true;
      const {graph, visited, classes} = generateMaze(width, height);
      currentGraph = graph;
      setDisplayClasses(classes);
      setDisplayVisited(visited);
    }
  },[]);

  useEffect(() => {
    let value = displayVisited[0];
    if (value === undefined) {
      return;
    }
    setMaze(oldMaze => {
      const newMaze = [...oldMaze];
      newMaze[value as number] = {
        ...newMaze[value as number],
        classes: displayClasses[value as value]
      } 
      return newMaze;
    })
    setDisplayVisited(displayVisited.slice(1))
  }, [displayVisited])

  return (
    <>
      <div className="mazeOuter">
        <div className="mazeInner" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
        {maze.map((value: {value: string, classes: string[]}, index) => <MazeTile key={index} value={value.value} classes={value.classes} boxSize={boxSize}/>)}
        </div>
      </div>
    </>
  );
}

export default Maze;