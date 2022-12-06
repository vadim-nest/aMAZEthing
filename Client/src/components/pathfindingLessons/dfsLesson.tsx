import { useEffect, useState, useRef } from 'react';
import { generateConnectedGraph } from '../../utils/maze';
import '../../css/pathFinding.css';
import { value } from '../../utils/graph';
import GraphVertex from './graphVertex';
import { showPath } from '../../utils/functionalities';
import Pagination from '../learning/pagination';
import MapKeys from './map-keys';
import StepsPath from './stepsPath';

function DfsLesson() {
  const [stats, setStats] = useState({ visited: 0, path: 0 });
  const [graph, setGraph] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const [width] = useState(10);
  const [end, setEnd] = useState<any>(width * width - 1);
  let steps = [
    'Check neighbors',
    'Add neighbors into queue',
    'Shift queue and keep checking neighbors',
    'Repeat until it founds last state',
    'Find shortest path',
  ];

  useEffect(() => {
    newGraph();
  }, []);

  function newGraph() {
    const newGraph = generateConnectedGraph(width, width, true);
    newGraph.removeUnweightedEdges();
    setGraph(newGraph);
    setStats({ visited: 0, path: 0 });
  }

  async function dfs() {
    const DFSVisualpaths = graph.findPath(0, end ? end : width * width, 'vdfs');
    if (DFSVisualpaths) {
      setStats({
        visited: DFSVisualpaths.visited.length,
        path: DFSVisualpaths.path.length,
      });
      let path: any = Array.from(DFSVisualpaths.visited);
      console.log('PATH', path);
      await showPath(path, true);
      path = Array.from(DFSVisualpaths.path);
      await showPath(path);
    }
    //setClicked(false);
  }

  return (
    <Pagination
      clicked={clicked}
      leftName={'Bfs'}
      rightName={'Dijkstra'}
      leftLink={'learning/bfsLesson'}
      rightLink={'learning/dijkstraLesson'}
    >
      <div className="whole-page-wrapper">
        <div className="sorting-algo">
          <h1 className="explanation-title">
            Depth First Search (DFS) algorithm
          </h1>
          <p className="explanation-text">
            DFS starts at the root node of a tree and goes as far as it
            can down a given path, then backtracks until it finds an
            unexplored path, and then explores it.
          </p>
          <p className="explanation-text centered-text">
            <span className="yellow-learning">UNWEIGHTED</span> - a very bad
            algorithm for path finding; does not guarantee the shortest path.
          </p>
        </div>
        <div className="visualization-wrapper">
          <MapKeys stats={stats}></MapKeys>
          <div className="lesson-wrapper">
            <div className="buttons-pos">
              <button
                className={clicked ? 'button disabled' : 'button'}
                disabled={clicked}
                onClick={() => {
                  newGraph();
                }}
              >
                NEW Graph
              </button>
              <button
                className={clicked ? 'button disabled' : 'button'}
                disabled={clicked}
                onClick={() => {
                  //setClicked(true);
                  dfs();
                }}
              >
                Visualize
              </button>
            </div>
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
          </div>
          <StepsPath steps={steps}></StepsPath>
        </div>
      </div>
    </Pagination>
  );
}

export default DfsLesson;
