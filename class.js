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
      ctx.fillText(this.text, this.x, this.y);
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
    this.arrowHead = new ArrowHead(vertexStart, vertexEnd);
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

class ParallelDirectedEdge extends DirectedEdge {
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
