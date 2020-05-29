'use strict';

const centerCanvasCalculate = (width, height) => {
  const x = width / 2;
  const y = height / 2;
  return { x, y };
};

const transposeMatrix = (matrix) => {
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
}

const booleanTransformation = (matrix) => {
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
}

const diagonalZero = (matrix) => {
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
}

