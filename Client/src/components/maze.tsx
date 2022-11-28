import React, { useEffect, useState } from "react";
import '../css/maze.css';
import { Graph, value } from "../utils/graph";
import { generateMaze } from "../utils/maze";
import { MazeTileType, minionType, TowerType } from "../utils/types";
import MazeTile from "./mazeTile";
import Minion from "./minion";
import Tower from "./tower";

function Maze({boxSize, setMazeCompleted, setCurrentMinion, minions, setCurrentTile, currentGraph, setCurrentGraph, height, width, maze, setMaze, towers, setTowers}: {
  boxSize:number,
  height: number,
  width: number,
  setMazeCompleted: () => void,
  minions: minionType[],
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentGraph: React.Dispatch<React.SetStateAction<Graph | undefined>>,
  currentGraph: Graph | undefined,
  maze: MazeTileType[],
  setMaze: React.Dispatch<React.SetStateAction<MazeTileType[]>>
  towers: TowerType[];
  setTowers: React.Dispatch<React.SetStateAction<TowerType[]>>
}) {

  // TODO: Set as state
  // const [boxSize, setBoxSize] = useState(50);

  function setCurrentTileHelper(value: number) {
    setCurrentTile({
      xPos: value%width,
      yPos: Math.floor(value / width)
    })
  }

  const [displayVisited, setDisplayVisited] = useState<value[]>([]);
  // const [displayClasses, setDisplayClasses] = useState<{[key: value]: string[]}>({});
  const [mazeGenerated, setMazeGenerated] = useState(false);
  const [allTilesHidden, setAllTilesHidden] = useState(true);

  useEffect(() => {
    const mazeTiles = document.getElementsByClassName('mazeTile');
    if (mazeGenerated === false) {
      setMazeGenerated(true);
      const {graph, visited, classes, towers} = generateMaze(width, height);
      setTowers(() => towers.map(tower => {
          return {
            xPos: tower%width,
            yPos: Math.floor(tower/width),
            color: 'red'
          }
        })
      )
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
          {towers.map(tower => <Tower xPos={tower.xPos} yPos={tower.yPos} color={tower.color} boxSize={boxSize}/>)}
          {maze.map((value: {value: value, classes: string[], path: '' | 'THOUGHTPROCESS' | 'PATH'}, index) => <MazeTile key={index} generated={allTilesHidden} value={value.value as string} path={value.path} classes={value.classes} boxSize={boxSize} setCurrentMinion={setCurrentMinion} setCurrentTileHelper={setCurrentTileHelper} setCurrentTile={setCurrentTile}/>)}
        </div>
      </div>
    </>
  );
}

export default Maze;