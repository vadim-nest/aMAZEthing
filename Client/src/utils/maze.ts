import { Graph, value } from "./graph";

export function generateConnectedGraph(width: number, height: number) {
  const nodeNum = width * height;
  
  const connectedGraph = new Graph();
  for (let i = 0; i < nodeNum; i++) {
    connectedGraph.addVertex(i);
  }

  for (let i = 0; i < nodeNum; i++) {
    if (i > width) connectedGraph.addEdge(i, i - width);
    if (i < nodeNum - width) connectedGraph.addEdge(i, i + width);
    if (i%width > 0) connectedGraph.addEdge(i, i - 1);
    if (i%width < width - 1) connectedGraph.addEdge(i, i + 1);
  }

  return connectedGraph;
}

export function resetGraph(graph: Graph, edges: [value, value, number][]) {
  // TODO: reset
}

export function generateMaze(width: number, height: number, graph: Graph | false = false) {
  if (graph === false) {
    graph = generateConnectedGraph(width, height);
  }
}
