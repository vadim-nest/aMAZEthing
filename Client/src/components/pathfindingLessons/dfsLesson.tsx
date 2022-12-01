import { useEffect, useState, useRef} from "react";
import "../../css/dfs-lesson.css";
import { Tree, Graph } from "../../utils/path-finding-learning-logic";
function DfsLesson() {
  const [graph,setGraph] = useState<Graph>()
  const [triggerDisplay,setTriggerDisplay] = useState(false)
  const ref:any = useRef(null);

  let paragraphs = {
    sortName: 'Depth First Search (DFS) algorithm',
    firstP:
      'DFS starts at the root (top) node of a tree and goes as far as it can down a given branch (path), then backtracks until it finds an unexplored path, and then explores it.',
  };

  useEffect(()=>{
    if(triggerDisplay) (document.querySelector('.dfs .lesson-wrapper-2') as unknown as HTMLElement).style.borderColor = 'var(--main-green)'
  },[triggerDisplay])

  useEffect(() => {
    async function TreeVisual() {
      const t = new Tree();
      await delay(1000);
      for (let i = 0; i < 40; i++) {
        t.add();
      }
      t.bfs();
      t.calculateWidthDynamically(ref.current.offsetWidth);
      t.createLines();
      t.getNodes();
      let g = new Graph(t.getArrNodes(), t.getDepth(), t.getTotalLines());
      setGraph(g);
    }
    TreeVisual();
  }, []);
  async function dfs(){
    await graph?.printPath(await graph?.dfs())
  }
  
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div className="whole-page-wrapper dfs">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>
      <div className="lesson-wrapper-2">
        <div className="but-options">
          <button className="button" onClick={dfs}>DFS</button>
        </div>
        <div ref={ref} id="myCanvas"></div>
      </div>
    </div>
  );
}

export default DfsLesson;
