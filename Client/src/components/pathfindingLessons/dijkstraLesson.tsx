import { useEffect, useState, useRef } from "react";
import "../../css/dijkstra-lesson.css";
import { generateConnectedGraph } from "../../utils/maze";
import { Graph, value } from "../../utils/graph";
import GraphVertex from "../graphVertex";


function DijkstraLesson() {
  const ref:any = useRef(null);
  const [graph,setGraph] = useState<Graph>();
  const [path,setPath] = useState<any>();


  let paragraphs = {
    sortName: 'Dijkstra algorithm',
    firstP:
      'This algorithm uses the weights of the edges to find the path that minimizes the total distance (weight) between the source node and all other nodes.',
  };

  useEffect(() => {
    const graph = generateConnectedGraph(5,5,true)
    console.log(graph);
    setGraph(graph);
    setPath(graph.findPath(0,24));
}, []);

  async function dijkstra(){
    console.log('PATH',path);
    for(let i =0;i<path.length;i++){
      await delay(100);
      document.getElementById(`${path[i]}`)!.style.backgroundColor = 'var(--main-green)';
      await delay(100);
      if(i+1!==path.length){
        if(path[i]<path[i+1]) document.getElementById(`${path[i]},${path[i+1]}-${path[i+1]},${path[i]}`)!.style.backgroundColor = 'var(--main-green)';
        else document.getElementById(`${path[i+1]},${path[i]}-${path[i]},${path[i+1]}`)!.style.backgroundColor = 'var(--main-green)';
      }
    }
  }
  
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div  className="dijk whole-page-wrapper">
      <div className="dijk lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>
      <button  onClick={()=>dijkstra()}></button>
      <div className="dijk lesson-wrapper-2">
        <div ref={ref} id="dijk myCanvas" >
          <div className="dijk graph-vertices" style={{gridTemplateColumns: `repeat(5, 1fr)`}}>
          {graph && graph.vertices.map((vertex:value) => <GraphVertex key={vertex} width={5} vertex={vertex} edges={graph.edges.filter((edge:any)=>edge[0]===vertex)} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DijkstraLesson;
