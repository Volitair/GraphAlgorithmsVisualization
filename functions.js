'use strict';

const centerCanvasCalculate = (width, height) => {
  const x = width / 2;
  const y = height / 2;
  return { x, y };
};

const transposeMatrix = matrix => {
  const m = matrix.length,
    n = matrix[0].length,
    matrixT = [];
  for (let i = 0; i < n; i++) {
    matrixT[i] = [];
    for (let j = 0; j < m; j++) matrixT[i][j] = matrix[j][i];
  }
  return matrixT;
};

const sumMatrix = (A, B) => {
  const
    m = A.length,
    n = A[0].length,
    C = [];
  for (let i = 0; i < m; i++) {
    C[i] = [];
    for (let j = 0; j < n; j++) {
      C[i][j] = A[i][j] + B[i][j];
    }
  }
  return C;
};

const booleanTransformation = matrix => {
  const
    n = matrix.length,
    C = [];
  for (let i = 0; i < n; i++) {
    C[i] = [];
    for (let j = 0; j < n; j++)
      if (matrix[i][j] === 0) {
        C[i][j] = 0;
      } else {
        C[i][j] = 1;
      }
  }
  return C;
};

const diagonalZero = matrix => {
  const
    n = matrix.length,
    C = [];
  for (let i = 0; i < n; i++) {
    C[i] = [];
    for (let j = 0; j < n; j++)
      if (i === j) {
        C[i][j] = 0;
      } else {
        C[i][j] = matrix[i][j];
      }
  }
  return C;
};

const symmetryMatrix = matrix => {
  const matrixT = transposeMatrix(matrix);
  const sum = sumMatrix(matrix, matrixT);
  return booleanTransformation(sum);
};

const centerCalculate = (width, height) => {
  const x = width / 2;
  const y = height / 2;
  return { x, y };
};

const calculateСoordsParallEdge = (start, end, dAngle) => {
  const endX = end.x;
  const endY = end.y;
  const startX = start.x;
  const startY = start.y;
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);
  const x1 = startX + start.radius * Math.cos(angle + dAngle);
  const y1 = startY + start.radius * Math.sin(angle + dAngle);
  const x2 = endX - end.radius * Math.cos(angle - dAngle);
  const y2 = endY - end.radius * Math.sin(angle - dAngle);
  const startPoint = { x: x1, y: y1 };
  const endPoint = { x: x2, y: y2 };
  return [startPoint, endPoint];
};

const calculateСoordsEdge = (start, end) => {
  const endX = end.x;
  const endY = end.y;
  const startX = start.x;
  const startY = start.y;
  const dx = endX - startX;
  const dy = endY - startY;
  const angle = Math.atan2(dy, dx);
  const x1 = startX + start.radius * Math.cos(angle);
  const y1 = startY + start.radius * Math.sin(angle);
  const x2 = endX - end.radius * Math.cos(angle);
  const y2 = endY - end.radius * Math.sin(angle);
  const startPoint = { x: x1, y: y1 };
  const endPoint = { x: x2, y: y2 };
  return [startPoint, endPoint];
};

const coordinateVertex = (n, center, multiplier) => {
  const xCenter = center.x;
  const yCenter = center.y;
  const width = widthGraph;
  const height = heightGraph;
  const dAngle = 2 * Math.PI / n;
  const radius = multiplier * Math.min(width, height) / 2;
  const vertexCoords = new Map();
  const angle = -1 * dAngle;

  for (let i = 1; i <= n; i++) {
    const dx = radius * Math.sin(angle + dAngle * i);
    const dy = radius * Math.cos(angle + dAngle * i);
    const x = xCenter + Math.floor(dx);
    const y = yCenter - Math.floor(dy);

    vertexCoords.set(i, { i, x, y });
  }
  return vertexCoords;
};

const drawDirGraph = (graph, ctx) => {
  const edges = graph.edges;
  const vertices = graph.vertices;
  const loops = graph.loops;

  for (const item of loops) {
    const loop = item[1];
    loop.draw(ctx);
  }

  for (const item of edges) {
    const edge = item[1];
    edge.draw(ctx);
    edge.arrowHead.draw(ctx);
  }

  for (const item of vertices) {
    const vertex = item[1];
    vertex.draw(ctx);
  }
};

const drawNotDirGraph = (graph, ctx) => {
  const edges = graph.edges;
  const vertices = graph.vertices;
  const loops = graph.loops;

  for (const item of loops) {
    const loop = item[1];
    loop.draw(ctx);
  }

  for (const item of edges) {
    const edge = item[1];
    edge.draw(ctx);
  }

  for (const item of vertices) {
    const vertex = item[1];
    vertex.draw(ctx);
  }
};

const drawCurrentValuePathLength = (graph, ctx, lengths, visited, current) => {
  const vertices = graph.vertices;
  for (let i = 0; i < visited.length; i++) {
    const vertex = vertices.get(i + 1);
    const currentLength = lengths[i];
    let lengthText = currentLength;
    if (currentLength === INF) {
      lengthText = '∞';
    }
    vertex.setCustomText(`${i + 1} (${lengthText})`);

    if (visited[i] === true) {
      if (i === current) {
        vertex.draw(ctx, true, 'yellow');
      } else {
        vertex.draw(ctx, true, 'blue');
      }
    } else {
      vertex.draw(ctx, true, 'red');
    }
  }
};

function halt(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const calculatePath = obj => {
  if (obj.parent === null) {
    const res = [(obj.id)];
    return res;
  }
  const res = calculatePath(obj.parent);
  res.push(obj.id);
  return res;
};

const logPathDijkstra = p => {
  if (p.length === 0) return;
  const arrPath = calculatePath(p);
  let result = '';
  for (let i = 0; i < arrPath.length; i++) {
    if (i === arrPath.length - 1) {
      result += `${arrPath[i] + 1} length: ${p.length}`;
      continue;
    }
    result += `${arrPath[i] + 1}->`;
  }
  console.log(result);
};
const logAllPathDijkstra = arrPath => {
  for (const path of arrPath) {
    logPathDijkstra(path);
  }
};

async function dijkstra(graph, ctx, start = 1) {
  const weights = graph.weights;
  const n = weights.length;
  const d = [];
  const p = [];
  const been = [];
  let current = undefined;
  d[start - 1] = 0;

  for (let i = 0; i < n; i++) {
    been[i] = false;
    if (i === start - 1) {
      p[i] = { id: i, parent: null, length: 0 };
      continue;
    }
    p[i] = { id: i, parent: null, length: INF };
    d[i] = INF;
  }

  for (let i = 0; i < n; i++) {
    let min = INF;

    for (let j = 0; j < n; j++) {
      if (!been[j] && d[j] < min) {
        min = d[j];
        current = j;
      }
    }

    been[current] = true;

    for (let i = 0; i < n; i++) {
      if (!been[i] && weights[current][i] !== 0) {
        if (d[i] > d[current] + weights[current][i]) {
          d[i] = d[current] + weights[current][i];
          p[i].length = d[current] + weights[current][i];
          p[i].parent = p[current];
        }
      }
    }
    drawCurrentValuePathLength(graph, ctx, d, been, current);
    await halt(delayHalt);
  }
  drawCurrentValuePathLength(graph, ctx, d, been);
  butDijkstra.disabled = false;
  logAllPathDijkstra(p);
}
