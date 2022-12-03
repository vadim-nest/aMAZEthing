import { useEffect, useState, useRef } from "react";
import "../../css/dijkstra-lesson.css";
import { Tree, Graph } from "../../utils/path-finding-learning-logic";
function DijkstraLesson() {
  const [graph,setGraph] = useState<Graph>()
  const [triggerDisplay,setTriggerDisplay] = useState(false)
  const ref:any = useRef(null);


  let paragraphs = {
    sortName: 'Dijkstra algorithm',
    firstP:
      'This algorithm uses the weights of the edges to find the path that minimizes the total distance (weight) between the source node and all other nodes.',
  };

  useEffect(()=>{
    if(triggerDisplay) (document.querySelector('.dijk .lesson-wrapper-2') as unknown as HTMLElement).style.borderColor = 'var(--main-green)'
  },[triggerDisplay])

  useEffect(() => {
    // async function TreeVisual() {
    //   const t = new Tree();
    //   await delay(1000);
    //   for (let i = 0; i < 15; i++) {
    //     t.add();
    //   }
    //   t.bfs();
    //   t.calculateWidthDynamically(ref.current.offsetWidth);
    //   t.createLines(175,true);//true with weights
    //   t.getNodes();
    //   console.log(t.getLineStructure())
    //   let g = new Graph(t.getArrNodes(), t.getDepth(), t.getLineStructure());
    //   setGraph(g);
    // }
    // TreeVisual();
  }, []);
  async function dijkstra(){
    await graph?.printPath(await graph?.dijkstra());
  }
  
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div  className="whole-page-wrapper dijk">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>
      <div className="lesson-wrapper-2">
        <div className="but-options">
          <button className="button" onClick={dijkstra}>Visualize</button>
        </div>
        <div ref={ref} id="myCanvas"></div>
      </div>
    </div>
  );
}

export default DijkstraLesson;
