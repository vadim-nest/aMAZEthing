import { useEffect, useState } from "react";
import '../css/maze.css';
import { Graph, value } from "../utils/graph";
import { generateMaze } from "../utils/maze";
import MazeTile from "./mazeTile";

function Maze() {

  // TODO: Set as state

  let width = 72;
  let height = 48;
  let boxSize = 16; 

  const array: {value: value, classes: ('b' | 't' | 'l' | 'r')[]}[] = [];
  for (let i = 0; i < width*height; i++) {
    array.push({value: i, classes: []})
  }
  const [maze, setMaze] = useState(array);
  const [displayVisited, setDisplayVisited] = useState<value[]>([]);
  const [displayClasses, setDisplayClasses] = useState<{[key: value]: string[]}>({});
  const [mazeGenerated, setMazeGenerated] = useState(false);
  const [mazeAnimating, setMazeAnimating] = useState(true);
  const [allTilesHidden, setAllTilesHidden] = useState(true);
  let currentGraph: Graph;

  useEffect(() => {
    const mazeTiles = document.getElementsByClassName('mazeTile');
    if (mazeGenerated === false) {
      console.log(mazeGenerated)
      setMazeGenerated(true);
      const {graph, visited, classes} = generateMaze(width, height);
      currentGraph = graph;
      setDisplayClasses(classes);
      setDisplayVisited(visited);
      setMaze(oldMaze => {
        const newMaze = [...oldMaze];
        for (let value of visited) {
          newMaze[value as number] = {
            ...newMaze[value as number],
            classes: classes[value as value]
          } 
        }
        return newMaze;
      })
    }
    else if (mazeAnimating) {
      const mazeTiles = document.getElementsByClassName('mazeTile');
      const halfway = Math.floor(mazeTiles.length/2);
      let index = 0;
      function step() {
        for (let i = 0; i < 50 - 49*((Math.abs(halfway - index)/halfway)); i++) {
          index++;
          if (index === displayVisited.length) break;
          const currentTile = mazeTiles[displayVisited[index] as number];
          currentTile.classList.remove('showNone');
        }

        if (index < displayVisited.length) requestAnimationFrame(step)
        else setAllTilesHidden(false);
      }
      requestAnimationFrame(step);
    }
  },[maze]);


  // useEffect(() => {
  //   let value = displayVisited[0];
  //   if (value === undefined) {
  //     return;
  //   }
    
  // }, [displayVisited])

  return (
    <>
      <div className="mazeOuter">
        <div className="mazeInner" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
        {maze.map((value: {value: value, classes: string[]}, index) => <MazeTile key={index} generated={allTilesHidden} value={value.value as string} classes={value.classes} boxSize={boxSize}/>)}
        </div>
      </div>
    </>
  );
}

export default Maze;