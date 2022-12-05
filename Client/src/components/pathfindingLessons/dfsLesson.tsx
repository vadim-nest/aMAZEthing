import { useEffect, useState, useRef} from "react";
import { generateConnectedGraph } from "../../utils/maze";
import "../../css/pathFinding.css";
import {  value } from "../../utils/graph";
import GraphVertex from "./graphVertex";
import {delay} from '../../utils/functionalities'

function DfsLesson() {
  const [graph,setGraph] = useState<any>();
  const [width, setWidth] = useState(15);
  const [end,setEnd] = useState<any>(width*width-1);

  let paragraphs = {
    sortName: 'Depth First Search (DFS) algorithm',
    firstP:
      'DFS starts at the root (top) node of a tree and goes as far as it can down a given branch (path), then backtracks until it finds an unexplored path, and then explores it.',
  };

  useEffect(() => {
    const graph = generateConnectedGraph(width, width, true);
    graph.removeUnweightedEdges();
    setGraph(graph);
  }, []);


  function newGraph(){
    const newgraph = generateConnectedGraph(width, width, true);
    newgraph.removeUnweightedEdges()
    setGraph(newgraph)
  }

  async function dfs(){
    const DFSVisualpaths = graph.findPath(0, end?end:width*width, "vdfs");
    if(DFSVisualpaths){
      let path: any = Array.from(DFSVisualpaths.visited);
      console.log("PATH", path);
      await showPath(path,true);
      path = Array.from(DFSVisualpaths.path);
      await showPath(path);
    }
  }
  async function showPath(path:number[],visited:boolean = false){
    for (let i = 0; i < path.length; i++) {
      await delay(10);
      document.getElementById(`${path[i]}`)!.style.backgroundColor = visited?"yellow" :"var(--main-green)";
      await delay(10);
      if (i + 1 !== path.length) {
        if(document.getElementById(`${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`) || document.getElementById(`${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`)){
          if (path[i] < path[i + 1]) document.getElementById(`${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`)!.style.backgroundColor = visited ? "yellow" : "var(--main-green)" ;
          else document.getElementById(`${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`)!.style.backgroundColor = visited ? "yellow" : "var(--main-green)" ;
        }
      }
    }
  }

  return (
    <div className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>
      <div className="buttons-pos">
        <button className="button" onClick={()=> {
          newGraph()}}>NEW Graph</button>
        <button className="button" onClick={()=>dfs()}>Visualize DFS</button>
      </div>
      <div className="lesson-wrapper-2">
        <div id="myCanvas" >
          <div className="graph-vertices" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
          {graph && graph.vertices.map((vertex:value) => <GraphVertex key={Math.random()} width={width} vertex={vertex} edges={graph.edges.filter((edge:any)=>edge[0]===vertex)} end={end} setEnd={setEnd} weightedGraph={false}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DfsLesson;
