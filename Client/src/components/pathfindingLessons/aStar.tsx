import { useEffect, useState, useRef } from "react";
import "../../css/aStar-lesson.css";
import { generateConnectedGraph } from "../../utils/maze";
import { Graph, value } from "../../utils/graph";
import GraphVertex from "./graphVertex";


function AStarLesson() {
  const ref:any = useRef(null);
  const [graph,setGraph] = useState<any>();
  const [width, setWidth] = useState(25);
  const [end,setEnd] = useState<any>(width*width-1);

  let paragraphs = {
    sortName: 'aStar (A*) algorithm',
    firstP:
      'A* assigns a weight to each open node equal to the weight of the edge to that node plus the approximate distance between that node and the finish. This approximate distance is found by the heuristic, and represents a minimum possible distance between that node and the end.',
  };

 useEffect(() => {
    setGraph([]);
    const graph = generateConnectedGraph(width, width, true);
    graph.removeUnweightedEdges();
    setGraph(graph);
  }, []);

  function newGraph(){
    const newgraph = generateConnectedGraph(width, width, true);
    newgraph.removeUnweightedEdges()
    setGraph(newgraph);
  }

  async function aStar(){
    const aStarVisualpaths = graph.findPath(0, end?end:width*width, "aStar");
    if(aStarVisualpaths){
      let path: any = Array.from(aStarVisualpaths.visited);
      console.log("PATH", path);
      await showPath(path,true);
      path = Array.from(aStarVisualpaths.path);
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

  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="aStar whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>
      <div className="buttons-pos">
        <button className="button" onClick={()=>newGraph()}>NEW Graph</button>
        <button className="button" onClick={()=>aStar()}>Visualize A*</button>
      </div>
      <div className="aStar lesson-wrapper-2">
        <div ref={ref} id="aStar myCanvas" >
          <div className="aStar graph-vertices" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
          {graph && graph.vertices.map((vertex:value) => <GraphVertex key={graph.edges.filter((edge:any)=>edge[0]===vertex)} width={width} vertex={vertex} edges={graph.edges.filter((edge:any)=>edge[0]===vertex)} setEnd={setEnd} end={end} weightedGraph={true}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AStarLesson;
