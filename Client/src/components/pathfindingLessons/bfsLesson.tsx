import { useEffect, useState, useRef} from "react";
import "../../css/bfs-lesson.css";
import { Tree, Graph } from "../../utils/path-finding-learning-logic";
function BfsLesson() {
  const [graph,setGraph] = useState<Graph>();
  const [triggerDisplay,setTriggerDisplay] = useState(false)
  const ref:any = useRef(null);

  let paragraphs = {
    sortName: 'Breath First Search (BFS) algorithm',
    firstP:
      'It begins at the root of the tree or graph and investigates all nodes at the current depth level (neighbours) before moving on to nodes at the next depth level.',
  };


  useEffect(()=>{
    if(triggerDisplay) (document.querySelector('.bfs .lesson-wrapper-2') as unknown as HTMLElement).style.borderColor = 'var(--main-green)'
  },[triggerDisplay])



  useEffect(() => {
    // async function TreeVisual() {
    //   const t = new Tree();
    //   await delay(1000);
    //   for (let i = 0; i < 50; i++) {
    //     t.add();
    //   }
    //   t.bfs();
    //   t.calculateWidthDynamically(ref.current.offsetWidth);
    //   t.createLines();
    //   setTriggerDisplay(!triggerDisplay)
    //   t.getNodes();
    //   let g = new Graph(t.getArrNodes(), t.getDepth(), t.getTotalLines());
    //   setGraph(g);
     
    // }
    // TreeVisual();
  }, []);
  
  async function bfs(){
    await graph?.printPath(await graph?.bfs());
  }
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="whole-page-wrapper bfs">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>
      <div className="lesson-wrapper-2">
        <div className="but-options">
          <button className="button" onClick={bfs}>Visualize</button>
        </div>
        <div ref={ref} id="myCanvas"></div>
      </div>
    </div>

)}

export default BfsLesson;
