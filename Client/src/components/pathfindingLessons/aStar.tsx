import { useEffect, useState, useRef } from "react";
import "../../css/aStar-lesson.css";
import { Tree } from "../../utils/path-finding-learning-logic";
import { generateConnectedGraph } from "../../utils/maze";


function AStarLesson() {
  const ref:any = useRef(null);

  let paragraphs = {
    sortName: 'aStar (A*) algorithm',
    firstP:
      'A* assigns a weight to each open node equal to the weight of the edge to that node plus the approximate distance between that node and the finish. This approximate distance is found by the heuristic, and represents a minimum possible distance between that node and the end.',
  };

  useEffect(() => {
    async function TreeVisual() {
      
      const t = new Tree(2);
      await delay(1000);
      for (let i = 0; i < 5; i++) {
        t.add();
      }
      console.log(t.bfs())
      console.log(t.getRoot())
      t.calculateWidthDynamically(ref.current.offsetWidth);



      console.log(generateConnectedGraph(4,4,true))




      // t.createLines(175,true);//true with weights
      // t.getNodes();
      // console.log(t.getLineStructure())
      // let g = new Graph(t.getArrNodes(), t.getDepth(), t.getLineStructure());
      // setGraph(g);
    }
    TreeVisual();
  }, []);
  async function aStar(){
    // await graph?.printPath(await graph?.dijkstra());
  }
  
  function delay(time: number) {
    return new Promise((res) => setTimeout(res, time));
  }

  return (
    <div  className="whole-page-wrapper aStar">
      <div className="lesson-wrapper">
        <h1>{paragraphs.sortName}</h1>
        <p>{paragraphs.firstP}</p>
      </div>
      <div className="lesson-wrapper-2">
        <div className="but-options">
          <button className="button" onClick={aStar}>aStar (A*)</button>
        </div>
        <div ref={ref} id="myCanvas"></div>
      </div>
    </div>
  );
}

export default AStarLesson;
