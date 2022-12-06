import { useEffect, useState, useRef } from "react";
import { generateConnectedGraph } from "../../utils/maze";
import "../../css/pathFinding.css";
import { value } from "../../utils/graph";
import GraphVertex from "./graphVertex";
import { showPath } from "../../utils/functionalities";
import Pagination from "../learning/pagination";
import MapKeys from "./map-keys";
import StepsPath from "./stepsPath";

function BfsLesson() {
  const [stats, setStats] = useState({ visited: 0, path: 0 });
  const [graph, setGraph] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const [width] = useState(10);
  const [end, setEnd] = useState<any>(width * width - 1);
  let steps = [
    "Check neighbors",
    "Add neighbors into queue",
    "Shift queue and keep checking neighbors",
    "Repeat until it founds last state",
    "Find shortest path",
  ];
  useEffect(() => {
    newGraph();
  }, []);

  function newGraph() {
    const newgraph = generateConnectedGraph(width, width, true);
    newgraph.removeUnweightedEdges();
    setGraph(newgraph);
    setStats({ visited: 0, path: 0 });
  }

  async function bfs() {
    const BFSVisualpaths = graph.findPath(0, end, "vbfs");
    if (BFSVisualpaths) {
      setStats({
        visited: BFSVisualpaths.visited.length,
        path: BFSVisualpaths.path.length,
      });
      let path: any = Array.from(BFSVisualpaths.visited);
      console.log("PATH", path);
      await showPath(path, true);
      path = Array.from(BFSVisualpaths.path);
      await showPath(path);
    }
    //setClicked(false)
  }

  return (
    <Pagination
      clicked={clicked}
      leftName={"Learning"}
      rightName={"Dfs"}
      leftLink={"learning"}
      rightLink={"learning/dfsLesson"}
    >
      <div className="whole-page-wrapper">
        <div className="sorting-algo">
          <h1 className="explanation-title">
            Breath First Search (BFS) algorithm
          </h1>
          <p className="explanation-text">
            Investigates all nodes at the current depth level (neighbours)
            before moving on to nodes at the next depth level.
          </p>
          <p className="explanation-text centered-text">
            ‣  <span className="yellow-learning">(unweighted)</span> guarantees the shortest path.
          </p>
        </div>

        <div className="visualization-wrapper">
          <MapKeys stats={stats}></MapKeys>
          <div className="lesson-wrapper">
            <div id="myCanvas">
              <div
                className="graph-vertices"
                style={{ gridTemplateColumns: `repeat(${width}, 1fr)` }}
              >
                {graph &&
                  graph.vertices.map((vertex: value) => (
                    <GraphVertex
                      key={Math.random()}
                      width={width}
                      vertex={vertex}
                      edges={graph.edges.filter(
                        (edge: any) => edge[0] === vertex
                      )}
                      end={end}
                      setEnd={setEnd}
                      weightedGraph={false}
                    />
                  ))}
              </div>
            </div>
            <div className="buttons-pos">
              <button
                className={clicked ? "button disabled" : "button"}
                onClick={() => {
                  newGraph();
                }}
              >
                NEW Graph
              </button>
              <button
                className={clicked ? "button disabled" : "button"}
                disabled={clicked}
                onClick={() => {
                  //setClicked(true);
                  bfs();
                }}
              >
                Visualize
              </button>
            </div>
          </div>
          <StepsPath steps={steps}></StepsPath>
        </div>
      </div>
    </Pagination>
  );
}

export default BfsLesson;
