import { useEffect, useState } from "react";
import "../../css/pathFinding.css";
import { generateConnectedGraph } from "../../utils/maze";
import { value } from "../../utils/graph";
import GraphVertex from "./graphVertex";
import { showPath } from "../../utils/functionalities";
import Pagination from "../learning/pagination";
import MapKeys from "./map-keys";
import StepsPath from "./stepsPath";

function DijkstraLesson() {
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
    setGraph(newgraph);
    setStats({ visited: 0, path: 0 });
  }

  async function dijkstra() {
    setClicked(false);
    const DIJKVisualpaths = graph.findPath(0, end, "vdijk");
    console.log("PATH", DIJKVisualpaths);
    if (DIJKVisualpaths) {
      setStats({
        visited: DIJKVisualpaths.visited.length,
        path: DIJKVisualpaths.path.length,
      });
      let path: any = Array.from(DIJKVisualpaths.visited);
      await showPath(path, true);
      path = Array.from(DIJKVisualpaths.path);
      await showPath(path);
    }
    // setClicked(false)
  }

  return (
    <Pagination
      clicked={clicked}
      leftName={"Dfs"}
      rightName={"aStar"}
      leftLink={"learning/dfsLesson"}
      rightLink={"learning/aStarLesson"}
    >
      <div className="whole-page-wrapper">
        <div className="sorting-algo">
          <h1 className="explanation-title">Dijkstra algorithm</h1>
          <p className="explanation-text">
            This algorithm uses the weights of the edges to find the path that
            minimizes the total distance (weight) between the source node and
            all other nodes.
          </p>
          <p className="explanation-text centered-text">
          ‣   <span className="yellow-learning">(weighted)</span> the father of pathfinding algorithms; guarantees the
            shortest path.
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
                      setEnd={setEnd}
                      end={end}
                      weightedGraph={true}
                    />
                  ))}
              </div>
            </div>
            <div className="buttons-pos">
              <button
                className={clicked ? "button disabled" : "button"}
                disabled={clicked}
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
                  // setClicked(true);
                  dijkstra();
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

export default DijkstraLesson;
