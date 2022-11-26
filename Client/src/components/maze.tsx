import { useEffect, useState } from "react";
import '../css/maze.css';
import { Graph, value } from "../utils/graph";
import { generateMaze } from "../utils/maze";
import { minionType } from "../utils/types";
import MazeTile from "./mazeTile";
import Minion from "./minion";

function Maze({boxSize, setMazeCompleted, setCurrentMinion, minions, setCurrentTile, currentGraph, setCurrentGraph, height, width}: {
  boxSize:number, 
  height: number,
  width: number,
  setMazeCompleted: () => void, 
  minions: minionType[],
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentGraph: React.Dispatch<React.SetStateAction<Graph | undefined>>,
  currentGraph: Graph | undefined,
}) {

  // TODO: Set as state
  // const [boxSize, setBoxSize] = useState(50);

  function setCurrentTileHelper(value: number) {
    setCurrentTile({
      xPos: value%width,
      yPos: Math.floor(value / width)
    })
  }

  const array: {value: value, classes: ('b' | 't' | 'l' | 'r')[]}[] = [];
  for (let i = 0; i < width*height; i++) {
    array.push({value: i, classes: []})
  }
  const [maze, setMaze] = useState(array);
  const [displayVisited, setDisplayVisited] = useState<value[]>([]);
  // const [displayClasses, setDisplayClasses] = useState<{[key: value]: string[]}>({});
  const [mazeGenerated, setMazeGenerated] = useState(false);
  const [allTilesHidden, setAllTilesHidden] = useState(true);

  useEffect(() => {
    const mazeTiles = document.getElementsByClassName('mazeTile');
    if (mazeGenerated === false) {
      setMazeGenerated(true);
      const {graph, visited, classes} = generateMaze(width, height);
      setCurrentGraph(graph);
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
    else if (allTilesHidden) {
      const mazeTiles = document.getElementsByClassName('mazeTile');
      const halfway = Math.floor(mazeTiles.length/2);
      let index = -1;
      function step() {
        for (let i = 0; i < 50 - 49*((Math.abs(halfway - index)/halfway)); i++) {
          index++;
          if (index === displayVisited.length) break;
          const currentTile = mazeTiles[displayVisited[index] as number];
          currentTile.classList.remove('showNone');
        }

        if (index < displayVisited.length) requestAnimationFrame(step)
        else {
          setAllTilesHidden(false);
          setMazeCompleted();
        };
      }
      requestAnimationFrame(step);
    }
  },[maze]);

  return (
    <>
      <div className="mazeOuter" onContextMenu={(e)=> e.preventDefault()}>
        <div className="mazeInner" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
          {minions.map(minion => <Minion boxSize={boxSize} minion={minion} setCurrentMinion={setCurrentMinion} setCurrentTile={setCurrentTile}/>)}
        {maze.map((value: {value: value, classes: string[]}, index) => <MazeTile key={index} generated={allTilesHidden} value={value.value as string} classes={value.classes} boxSize={boxSize} setCurrentMinion={setCurrentMinion} setCurrentTileHelper={setCurrentTileHelper} setCurrentTile={setCurrentTile}/>)}
        </div>
      </div>
    </>
  );
}

export default Maze;