'use strict';

class Vertex {
  constructor(obj, radius) {
    this.x = obj.x;
    this.y = obj.y;
    this.i = obj.i;
    this.customText;
    this.radius = radius;
  }

  draw(ctx, customText = false, fillColor = 'white') {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fillStyle = fillColor;
    ctx.fill();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    // Fill text
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    if (customText) {
      ctx.fillText(this.customText, this.x, this.y);
    } else {
      ctx.fillText(this.i, this.x, this.y);
    }
  }

  setCustomText(text) {
    this.customText = text;
  }
}

class Edge {
  constructor(vertexStart, vertexEnd) {
    this.vertexStart = vertexStart;
    this.vertexEnd = vertexEnd;
    this.startX = vertexStart.x;
    this.startY = vertexStart.y;
    this.endX = vertexEnd.x;
    this.endY = vertexEnd.y;
    this.startI = vertexStart.i;
    this.endI = vertexEnd.i;

    // AX+By+C=0
    this.A = this.endY - this.startY;
    this.B = this.startX - this.endX;
    this.C = this.endX * this.startY - this.startX * this.endY;
  }

  draw(ctx, strokeColor = 'black', lineWidth = 1) {
    const dx = this.endX - this.startX;
    const dy = this.endY - this.startY;
    const angle = Math.atan2(dy, dx);
    const x1 = this.startX + this.vertexStart.radius * Math.cos(angle);
    const y1 = this.startY + this.vertexStart.radius * Math.sin(angle);
    const x2 = this.endX - this.vertexEnd.radius * Math.cos(angle);
    const y2 = this.endY - this.vertexEnd.radius * Math.sin(angle);

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle  = strokeColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.lineWidth = 1;
  }

  set weight(weights) {
    this.weightEdge = weights[this.startI - 1][this.endI - 1];
    const rand = Math.random();
    let k;
    if (rand < 0.25 || rand > 0.75) {
      k = 0.4;
    } else {
      k = rand;
    }
    this.weightX = ((this.endX - this.startX) * k) + this.startX;
    this.weightY = ((this.endY - this.startY) * k) + this.startY;
  }

  drawWeight(ctx, fillStyle = 'black') {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = fillStyle;
    ctx.fillText(this.weightEdge, this.weightX, this.weightY);
  }
}

class Loop {
  constructor(vertex) {
    this.vertex = vertex;
    this.x = vertex.x;
    this.y = vertex.y;
  }

  draw(ctx) {
    const dx = center.x - this.x;
    const dy = center.y - this.y;
    const radius = this.vertex.radius;
    const angle = Math.atan2(dy, dx);
    const xLoop = this.x - radius * kLoop * Math.cos(angle);
    const yLoop = this.y - radius * kLoop * Math.sin(angle);

    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.arc(xLoop, yLoop, radiusLoop, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

class ArrowHead {
  constructor(vertexStart, vertexEnd) {
    this.start = vertexStart;
    this.end = vertexEnd;
    this.startX = vertexStart.x;
    this.startY = vertexStart.y;
    this.endX = vertexEnd.x;
    this.endY = vertexEnd.y;
  }

  draw(ctx, fillColor = 'white') {
    const lateralSide = 15;
    const arrowAngle = Math.PI / 8;
    const dx = this.endX - this.startX;
    const dy = this.endY - this.startY;
    const angle = Math.atan2(dy, dx);
    const x0 = this.endX;
    const y0 = this.endY;
    const x1 = x0 - lateralSide * Math.cos(angle + arrowAngle);
    const y1 = y0 - lateralSide * Math.sin(angle + arrowAngle);
    const x2 = x0 - lateralSide * Math.cos(angle - arrowAngle);
    const y2 = y0 - lateralSide * Math.sin(angle - arrowAngle);


    ctx.fillStyle = fillColor;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x0, y0);
    ctx.fill();

    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x0, y0);
    ctx.stroke();
  }
}

class DirectedEdge extends Edge {
  constructor(vertexStart, vertexEnd) {
    super(vertexStart, vertexEnd);
  }

  createArrowHead() {
    const objStart = this.vertexStart;
    const objEnd = this.vertexEnd;
    const coords = calculateСoordsEdge(objStart, objEnd);
    this.arrowHead = new ArrowHead(...coords);
  }

  draw(ctx, strokeColor = 'black') {
    const dx = this.endX - this.startX;
    const dy = this.endY - this.startY;
    const angle = Math.atan2(dy, dx);
    const x1 = this.startX + this.vertexStart.radius * Math.cos(angle);
    const y1 = this.startY + this.vertexStart.radius * Math.sin(angle);
    const x2 = this.endX - this.vertexEnd.radius * Math.cos(angle);
    const y2 = this.endY - this.vertexEnd.radius * Math.sin(angle);

    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    this.arrowHead.draw(ctx, strokeColor);
  }
}

class ParallelDirectedEdge extends Edge {
  constructor(objStart, objEnd, dAngle) {
    super(objStart, objEnd);
    this.dAngle = dAngle;
  }

  createArrowHead() {
    const objStart = this.vertexStart;
    const objEnd = this.vertexEnd;
    const coords = calculateСoordsParallEdge(objStart, objEnd, this.dAngle);
    this.arrowHead = new ArrowHead(...coords);
  }

  draw(ctx, strokeColor = 'black') {
    const dx = this.endX - this.startX;
    const dy = this.endY - this.startY;
    const angle = Math.atan2(dy, dx);
    const x1 = this.startX + this.vertexStart.radius * Math.cos(angle + this.dAngle);
    const y1 = this.startY + this.vertexStart.radius * Math.sin(angle + this.dAngle);
    const x2 = this.endX - this.vertexEnd.radius * Math.cos(angle - this.dAngle);
    const y2 = this.endY - this.vertexEnd.radius * Math.sin(angle - this.dAngle);

    ctx.strokeStyle  = strokeColor;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    this.arrowHead.draw(ctx, strokeColor);
  }
}

class Graph {
  constructor(matrix) {
    this.matrix = matrix;
    this.vertices = new Map();
    this.loops = new Map();
    this.edges = new Map();
  }

  createVertexObj() {
    const n = this.matrix.length;
    const coords = coordinateVertex(n, center, multiplier);

    for (const obj of coords) {
      const vertex = new Vertex(obj[1], radiusVertex);
      this.vertices.set(vertex.i, vertex);
    }
  }
}

class DirectedGraph extends Graph {
  constructor(matrix) {
    super(matrix);
  }

  createGraphElements() {
    const matrix = this.matrix;
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (matrix[i][j] === 1) {
          if (i === j) {
            const v = this.vertices.get(i + 1);
            const loop = new Loop(v);
            this.loops.set(v.i, loop);
          } else if (matrix[i][j] === matrix[j][i]) {
            const elementI = i + 1;
            const elementJ = j + 1;
            const vi = this.vertices.get(elementI);
            const vj = this.vertices.get(elementJ);
            const edge = new ParallelDirectedEdge(vi, vj, dAngle);
            edge.createArrowHead();
            this.edges.set(`${i + 1} - ${j + 1}`, edge);
          } else {
            const elementI = i + 1;
            const elementJ = j + 1;
            const vi = this.vertices.get(elementI);
            const vj = this.vertices.get(elementJ);
            const edge = new DirectedEdge(vi, vj);
            edge.createArrowHead();
            this.edges.set(`${i + 1} - ${j + 1}`, edge);
          }
        }
      }
    }
  }
}

class NotDirectedGraph extends Graph {
  constructor(matrix) {
    super(matrix);
  }

  setWeights(weightsMatrix) {
    this.weights = weightsMatrix;
    for (const item of this.edges) {
      const edge = item.pop();
      edge.weight = weightsMatrix;
    }
  }

  createGraphElements() {
    const matrix = this.matrix;
    const n = matrix.length;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j <= i; j++) {
        if (matrix[i][j] === 1) {
          if (i === j) {
            const v = this.vertices.get(i + 1);
            const loop = new Loop(v);
            this.loops.set(v.i, loop);
          } else {
            const elementI = i + 1;
            const elementJ = j + 1;
            const vi = this.vertices.get(elementI);
            const vj = this.vertices.get(elementJ);
            const edge = new Edge(vi, vj);
            this.edges.set(`${i + 1} - ${j + 1}`, edge);
          }
        }
      }
    }
  }

  drawAllWeights(ctx) {
    for (const item of this.edges) {
      const edge = item.pop();
      edge.drawWeight(ctx);
    }
  }
}

class Kruskal {
  constructor(graph) {
    this.graph = graph;
    this.edges = graph.edges;
  }

  find(parent, i) {
    if (parent[i] === i) return i;
    return this.find(parent, parent[i]);
  }

  union(parent, rank, x, y) {
    const xRoot = this.find(parent, x);
    const yRoot = this.find(parent, y);

    if (rank[xRoot] < rank[yRoot]) {
      parent[xRoot] = yRoot;
    } else if (rank[xRoot] > rank[yRoot]) {
      parent[yRoot] = xRoot;
    } else {
      parent[yRoot] = xRoot;
      rank[xRoot] += 1;
    }
  }

  kruskalMST() {
    const n = this.graph.matrix.length;
    const result = [];
    let currentStep = 0;
    let currentEdge = 0;
    this.skeletonMatrix = zeroMatrix(n);

    const arrEdges = [];
    for (const item of this.edges) {
      arrEdges.push(item[1]);
    }
    arrEdges.sort((a, b) => a.weightEdge - b.weightEdge);

    const parent = [];
    const rank = [];

    for (let i = 0; i < n; i++) {
      parent.push(i);
      rank.push(0);
    }

    while (currentStep < n - 1) {
      const v1 = arrEdges[currentEdge].startI - 1;
      const v2 = arrEdges[currentEdge].endI - 1;

      const rootv1 = this.find(parent, v1);
      const rootv2 = this.find(parent, v2);
      if (rootv1 !== rootv2) {
        currentStep++;
        result.push(arrEdges[currentEdge]);
        this.union(parent, rank, rootv1, rootv2);
        this.skeletonMatrix[v1][v2] = 1;
        this.skeletonMatrix[v2][v1] = 1;
      }
      currentEdge++;
    }
    return result;
  }
}

