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

