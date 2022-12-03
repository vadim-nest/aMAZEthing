import { useEffect, useState, useRef} from "react";
import { generateConnectedGraph } from "../../utils/maze";
import "../../css/dfs-lesson.css";
import { Graph, value } from "../../utils/graph";
import GraphVertex from "../graphVertex";


function DfsLesson() {
  const ref:any = useRef(null);
  const [graph,setGraph] = useState<Graph>();
  const [path,setPath] = useState<any>();

  let paragraphs = {
    sortName: 'Depth First Search (DFS) algorithm',
    firstP:
      'DFS starts at the root (top) node of a tree and goes as far as it can down a given branch (path), then backtracks until it finds an unexplored path, and then explores it.',
  };

  
  useEffect(() => {
    const graph = generateConnectedGraph(15,15,true)
    console.log(graph);
    setGraph(graph);
    setPath(graph.findPath(0,205));
  }, []);


  async function dfs(){
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
    <div  className="dfs whole-page-wrapper">
    <div className="dfs lesson-wrapper">
      <h1>{paragraphs.sortName}</h1>
      <p>{paragraphs.firstP}</p>
    </div>
    <button  onClick={()=>dfs()}></button>
    <div className="dfs lesson-wrapper-2">
      <div ref={ref} id="dfs myCanvas" >
        <div className="dfs graph-vertices" style={{gridTemplateColumns: `repeat(15, 1fr)`}}>
        {graph && graph.vertices.map((vertex:value) => <GraphVertex key={vertex} width={15} vertex={vertex} edges={graph.edges.filter((edge:any)=>edge[0]===vertex)} />)}
        </div>
      </div>
    </div>
  </div>
  );
}

export default DfsLesson;
