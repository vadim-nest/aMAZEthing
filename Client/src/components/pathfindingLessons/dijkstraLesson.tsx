import { useEffect, useState, useRef } from "react";
import "../../css/dijkstra-lesson.css";
import { generateConnectedGraph } from "../../utils/maze";
import { value } from "../../utils/graph";
import GraphVertex from "./graphVertex";


function DijkstraLesson() {
  const ref:any = useRef(null);
  const [graph,setGraph] = useState<any>();
  const [width, setWidth] = useState(15);
  const [end, setEnd] = useState<any>(width * width - 1);

  let paragraphs = {
    sortName: 'Dijkstra algorithm',
    firstP:
      'This algorithm uses the weights of the edges to find the path that minimizes the total distance (weight) between the source node and all other nodes.',
  };

  useEffect(() => {
    const graph = generateConnectedGraph(width, width, true);
    setGraph(graph);
}, []);

  function newGraph() {
    setGraph([]);
    const newgraph = generateConnectedGraph(width, width, true);
    setGraph(newgraph);
  }

  async function dijkstra(){
    const DIJKVisualpaths = graph.findPath(0, end, "vdijk");
    console.log("PATH", DIJKVisualpaths);
    if(DIJKVisualpaths){
      let path: any = Array.from(DIJKVisualpaths.visited);
      await showPath(path,true);
      path = Array.from(DIJKVisualpaths.path);
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
          if (path[i] < path[i + 1]) document.getElementById(`${path[i]},${path[i + 1]}-${path[i + 1]},${path[i]}`)!.style.backgroundColor = visited?"yellow" :"var(--main-green)";
          else document.getElementById(`${path[i + 1]},${path[i]}-${path[i]},${path[i + 1]}`)!.style.backgroundColor = visited?"yellow" :"var(--main-green)";
        }
      }
    }
  }

  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div  className="whole-page-wrapper">
      <div className="sorting-algo">
        <h1 className="explanation-title">{paragraphs.sortName}</h1>
        <p className="explanation-text">{paragraphs.firstP}</p>
      </div>
      <div className="buttons-pos">
        <button className="button" onClick={() => newGraph()}>NEW Graph </button>
        <button className="button" onClick={()=>dijkstra()}>Visualize Dijkstra</button>
      </div>
      <div className="dijk lesson-wrapper-2">
        <div ref={ref} id="dijk myCanvas" >
          <div className="dijk graph-vertices" style={{gridTemplateColumns: `repeat(${width}, 1fr)`}}>
          {graph && graph.vertices.map((vertex:value) => <GraphVertex key={graph.edges.filter((edge:any)=>edge[0]===vertex)} width={width} vertex={vertex} edges={graph.edges.filter((edge:any)=>edge[0]===vertex)} setEnd={setEnd} end={end} weightedGraph={true}/>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DijkstraLesson;
