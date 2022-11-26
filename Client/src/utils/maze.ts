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
  const nodeNum = width * height;
  const classes: {[key: value]: ('b'|'t'|'r'|'l')[]} = {};
  const visited:value[] = [0];
  const stack:value[] = [0];
  const edges: [value, value, number][] = [];
  while(stack.length) {
    let i = stack.pop() as number;
    let neighbors = graph.neighbors(i).filter(neighbor => !visited.includes(neighbor));
    if (neighbors.length) {
      stack.push(i);
      let neighbor = neighbors[Math.floor(Math.random()*neighbors.length)] as number;
      edges.push([i, neighbor, 1]);
      edges.push([neighbor, i, 1]);
      if (i - neighbor === 1) {
        if (classes[i]) {
          if (!classes[i].includes('l')) classes[i].push('l')
        }
        else classes[i] = ['l'];
        if (classes[neighbor]) {
          if (!classes[neighbor].includes('r')) classes[neighbor].push('r')
        }
        else classes[neighbor] = ['r'];
      } else if (i - neighbor === -1) {
        if (classes[i]) {
          if (!classes[i].includes('r')) classes[i].push('r')
        }
        else classes[i] = ['r'];
        if (classes[neighbor]) {
          if (!classes[neighbor].includes('l')) classes[neighbor].push('l')
        }
        else classes[neighbor] = ['l'];
      } else if (i - neighbor === width) {
        if (classes[i]) {
          if (!classes[i].includes('t')) classes[i].push('t')
        }
        else classes[i] = ['t'];
        if (classes[neighbor]) {
          if (!classes[neighbor].includes('b')) classes[neighbor].push('b')
        }
        else classes[neighbor] = ['b'];
      } else if (neighbor - i === width) {
        if (classes[i]) {
          if (!classes[i].includes('b')) classes[i].push('b')
        }
        else classes[i] = ['b'];
        if (classes[neighbor]) {
          if (!classes[neighbor].includes('t')) classes[neighbor].push('t')
        }
        else classes[neighbor] = ['t'];
      }
      stack.push(neighbor);
      visited.push(neighbor);
    }
  }
  graph.edges = edges;
  for (let j = 0; j < width; j++) {
    let i = Math.floor(Math.random()*nodeNum);
    if (i > width) {
      graph.addEdge(i, i - width);
      if (classes[i]) {
        if (!classes[i].includes('t')) classes[i].push('t')
      }
      else classes[i] = ['t'];
      if (classes[i - width]) {
        if (!classes[i - width].includes('b')) classes[i - width].push('b')
      }
      else classes[i - width] = ['b'];
    };
    if (i < nodeNum - width) {
      graph.addEdge(i, i + width);
      if (classes[i]) {
        if (!classes[i].includes('b')) classes[i].push('b')
      }
      else classes[i] = ['b'];
      if (classes[i + width]) {
        if (!classes[i + width].includes('t')) classes[i + width].push('t')
      }
      else classes[i + width] = ['t'];
    };
    if (i%width > 0) {
      graph.addEdge(i, i - 1);
      if (classes[i]) {
        if (!classes[i].includes('l')) classes[i].push('l')
      }
      else classes[i] = ['l'];
      if (classes[i - 1]) {
        if (!classes[i - 1].includes('r')) classes[i - 1].push('r')
      }
      else classes[i - 1] = ['r'];
    };
    if (i%width < width - 1) {
      graph.addEdge(i, i + 1);
      if (classes[i]) {
        if (!classes[i].includes('r')) classes[i].push('r')
      }
      else classes[i] = ['r'];
      if (classes[i + 1]) {
        if (!classes[i + 1].includes('l')) classes[i + 1].push('l')
      }
      else classes[i + 1] = ['l'];
    };
  }
  return {
    graph,
    visited,
    classes
  }
}
