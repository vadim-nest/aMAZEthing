import React, { useEffect, useState } from "react";
import '../css/maze.css';
import apiService from "../services/apiService";
import { Graph, value } from "../utils/graph";
import { generateMaze } from "../utils/maze";
import { MazeTileType, minionType, TowerType } from "../utils/types";
import MazeTile from "./mazeTile";
import Minion from "./minion";
import Tower from "./tower";
import Home from './home'


function Maze({boxSize, setMazeCompleted, setCurrentMinion, minions, setCurrentTile, currentGraph, setCurrentGraph, height, width, maze, setMaze, towers, setTowers, currentTower, setCurrentTower, allTilesHidden, setAllTilesHidden, towersSorting, zoomed}: {
  boxSize:number,
  height: number,
  width: number,
  setMazeCompleted: () => void,
  minions: minionType[],
  setCurrentMinion: React.Dispatch<React.SetStateAction<number | null>>,
  setCurrentTile: React.Dispatch<React.SetStateAction<null | {xPos:number, yPos:number}>>,
  setCurrentGraph: React.Dispatch<React.SetStateAction<Graph | undefined>>,
  currentGraph: Graph | undefined,
  maze: {currentMinion: null | number, maze: MazeTileType[]},
  setMaze: React.Dispatch<React.SetStateAction<{currentMinion: null | number, maze: MazeTileType[]}>>
  towers: TowerType[],
  setTowers: React.Dispatch<React.SetStateAction<TowerType[]>>,
  currentTower: null | TowerType,
  setCurrentTower: React.Dispatch<React.SetStateAction<null|TowerType>>
  allTilesHidden: boolean,
  setAllTilesHidden: React.Dispatch<React.SetStateAction<boolean>>,
  towersSorting: {[key: number]: number},
  zoomed: boolean
}) {

  // TODO: Set as state

  function setCurrentTileHelper(value: number) {
    setCurrentTile({
      xPos: value%width,
      yPos: Math.floor(value / width)
    })
  }

  const [displayVisited, setDisplayVisited] = useState<value[]>([]);
  const [mazeGenerated, setMazeGenerated] = useState(false);
  
  useEffect(() => {
    // async function mazeInit(){
      const mazeTiles = document.getElementsByClassName('mazeTile');
      if (mazeGenerated === false) {
        setMazeGenerated(true);
        const {graph, visited, classes, towers} = generateMaze(width,height)
        
        //const {graph, visited, classes, towers} = await apiService.createMaze(width,height)
        // let graph = new Graph()
        // graph.reAssign(graphBE)
        // console.log({graph, visited, classes, towers});
        
        setTowers(() => towers.map((tower:any) => {
          return {
            id: tower,
            xPos: tower%width,
            yPos: Math.floor(tower/width),
            numbers: [Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2, Math.floor(Math.random()*8)+2],
            color: 'red',
            minion: null,
            minionAlignment: null,
            alignment: 'none',
            animations: [],
            minionSortingSpeed: null,
            sortingAlgo: 'bubble'
          }
        })
        )
        setCurrentGraph(graph);
        setDisplayVisited(visited);
        setMaze(oldMaze => {
          const newMaze = [...oldMaze.maze];
          for (let value of visited) {
            newMaze[value as number] = {
              ...newMaze[value as number],
              classes: classes[value as value]
            }
          }
          return {...oldMaze, maze: newMaze};
        })
        
      }
      else if (allTilesHidden && currentGraph) {
        const mazeTiles = document.getElementsByClassName('mazeTile');
        console.log({mazeTiles})
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
    // }
    // mazeInit();
  },[maze]);

  return (
    <>
      <div className="mazeOuter" onContextMenu={(e)=> e.preventDefault()}>
        <div className="mazeInner" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
          <Home xPos={0} yPos={0} boxSize={boxSize} player='p1'/>
          <Home xPos={width - 3} yPos={height - 3} boxSize={boxSize} player='p2'/>
          {minions.map(minion => <Minion key={minion.id} boxSize={boxSize} minion={minion} setCurrentMinion={setCurrentMinion} setCurrentTile={setCurrentTile} setCurrentTower={setCurrentTower}/>)}
          {!allTilesHidden && towers.map(tower => <Tower key={tower.id} tower={tower} zoomed={zoomed} towersSorting={towersSorting} boxSize={boxSize} width={width} height={height} setCurrentTile={setCurrentTile} setCurrentTower={setCurrentTower} setCurrentMinion={setCurrentMinion}/>)}
          {maze.maze.map((value: {value: value, classes: string[], path: '' | 'THOUGHTPROCESS' | 'PATH'}, index) => <MazeTile key={index} setCurrentTower={setCurrentTower} generated={allTilesHidden} value={value.value as string} path={value.path} classes={value.classes} boxSize={boxSize} setCurrentMinion={setCurrentMinion} setCurrentTileHelper={setCurrentTileHelper} setCurrentTile={setCurrentTile}/>)}
        </div>
      </div>
    </>
  );
}

export default Maze;