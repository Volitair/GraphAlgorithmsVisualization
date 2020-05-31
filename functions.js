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
    const loop = item.pop();
    loop.draw(ctx);
  }

  for (const item of edges) {
    const edge = item.pop();
    edge.draw(ctx);
    edge.arrowHead.draw(ctx);
  }

  for (const item of vertices) {
    const vertex = item.pop();
    vertex.draw(ctx);
  }
};

const drawNotDirGraph = (graph, ctx) => {
  const edges = graph.edges;
  const vertices = graph.vertices;
  const loops = graph.loops;

  for (const item of loops) {
    const loop = item.pop();
    loop.draw(ctx);
  }

  for (const item of edges) {
    const edge = item.pop();
    edge.draw(ctx);
  }

  for (const item of vertices) {
    const vertex = item.pop();
    vertex.draw(ctx);
  }
};

