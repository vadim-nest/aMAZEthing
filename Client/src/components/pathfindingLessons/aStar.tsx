import { useEffect, useState } from 'react';
import '../../css/pathFinding.css';
import { generateConnectedGraph } from '../../utils/maze';
import { value } from '../../utils/graph';
import GraphVertex from './graphVertex';
import { showPath } from '../../utils/functionalities';
import Pagination from '../learning/pagination';
import MapKeys from './map-keys';
import StepsPath from './stepsPath';

function AStarLesson() {
  const [stats, setStats] = useState({ visited: 0, path: 0 });
  const [graph, setGraph] = useState<any>();
  const [clicked, setClicked] = useState(false);
  const [width] = useState(10);
  const [end, setEnd] = useState<any>(width * width - 1);
  const [heuristicValue, setHeuristic] = useState(50);
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
    const newgraph = generateConnectedGraph(width, width, true);
    newgraph.removeUnweightedEdges();
    setGraph(newgraph);
    setStats({ visited: 0, path: 0 });
  }

  async function aStar() {
    setClicked(false);
    const aStarVisualpaths = graph.findPath(
      0,
      end ? end : width * width,
      'aStar',
      width,
      heuristicValue / 20
    );
    if (aStarVisualpaths) {
      setStats({
        visited: aStarVisualpaths.visited.length,
        path: aStarVisualpaths.path.length,
      });
      let path: any = Array.from(aStarVisualpaths.visited);
      console.log('PATH', path);
      await showPath(path, true);
      path = Array.from(aStarVisualpaths.path);
      await showPath(path);
    }
    // setClicked(false)
  }

  return (
    <Pagination
      clicked={clicked}
      leftName={'Dijkstra'}
      rightName={'Learning'}
      leftLink={'learning/dijkstraLesson'}
      rightLink={'learning'}
    >
      <div className="whole-page-wrapper">
        <div className="sorting-algo">
          <h1 className="explanation-title">aStar (A*) algorithm</h1>
          <p className="explanation-text">
            A* is similar to Dijkstra, however it prioritizes paths that seem to
            be leading closer to a goal. This is found by the heuristic, and
            represents a minimum possible distance between a node and the end.
          </p>
          <p className="explanation-text centered-text">
            <span className="yellow-learning">WEIGHTED</span> - arguably the
            best path finding algorithm.
          </p>
        </div>
        <div className="heuristicDiv">
          {heuristicValue < 15 ? (
            <p>
              A* acts as <span className="yellow-learning">Dijkstra</span>, just
              taking the weights into account
            </p>
          ) : heuristicValue > 95 ? (
            <p>
              A* is totally <span className="yellow-learning">heuristic</span>,
              not taking care of the weights but distance to the Endpoint
            </p>
          ) : (
            <p>
              You can modify how{' '}
              <span className="yellow-learning">'heuristic heavy'</span> the A*
              algorithm can be
            </p>
          )}
          <label>
            <input
              type="range"
              className="slider"
              name="heuristic-range"
              value={heuristicValue}
              min="0"
              max="100"
              onChange={(e: any) => {
                setHeuristic(e.target.value);
              }}
            />
            {'     '}
            {heuristicValue}%
          </label>
        </div>
        <div className="visualization-wrapper">
          <MapKeys stats={stats}></MapKeys>
          <div className="lesson-wrapper">
            <div className="buttons-pos margin-for-a-star">
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
                  // setClicked(true);
                  aStar();
                }}
              >
                Visualize A*
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
                      setEnd={setEnd}
                      end={end}
                      weightedGraph={true}
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

export default AStarLesson;
