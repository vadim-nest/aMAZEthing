import { useEffect, useState, useRef} from "react";
import { generateConnectedGraph } from "../../utils/maze"
import "../../css/bfs-lesson.css";
import { Graph, value } from "../../utils/graph";
import GraphVertex from "../graphVertex";

function BfsLesson() {
  const ref:any = useRef(null);
  const [graph,setGraph] = useState<Graph>();
  const [path,setPath] = useState<any>();

  let paragraphs = {
    sortName: 'Breath First Search (BFS) algorithm',
    firstP:
      'It begins at the root of the tree or graph and investigates all nodes at the current depth level (neighbours) before moving on to nodes at the next depth level.',
  };

  useEffect(() => {
    const graph = generateConnectedGraph(15,15,true)
    console.log(graph);
    setGraph(graph);
    setPath(Array.from(graph.findPath(0,205,'bfs') as any));
  }, []);
  
  async function bfs(){

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
    <div  className="bfs whole-page-wrapper">
    <div className="bfs lesson-wrapper">
      <h1>{paragraphs.sortName}</h1>
      <p>{paragraphs.firstP}</p>
    </div>
    <button  onClick={()=>bfs()}></button>
    <div className="bfs lesson-wrapper-2">
      <div ref={ref} id="bfs myCanvas" >
        <div className="bfs graph-vertices" style={{gridTemplateColumns: `repeat(15, 1fr)`}}>
        {graph && graph.vertices.map((vertex:value) => <GraphVertex key={vertex} width={15} vertex={vertex} edges={graph.edges.filter((edge:any)=>edge[0]===vertex)} />)}
        </div>
      </div>
    </div>
  </div>
  );
}

export default BfsLesson;
