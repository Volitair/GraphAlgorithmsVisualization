'use strict';

const canvasDir = document.getElementById('cDirGraph');
const canvasNotDir = document.getElementById('cNotDirCraph');
const canvasWeights = document.getElementById('weights');
const canvasWeights2 = document.getElementById('weights2');
const canvasDijkstra = document.getElementById('cDijkstra');
const canvasKruskal = document.getElementById('cKruskal');

const butDijkstra = document.getElementById('butDijkstra');
const butKruskalAlgorithm = document.getElementById('butKruskalAlgorithm');

const ctxDir = canvasDir.getContext('2d');
const ctxNotDir = canvasNotDir.getContext('2d');
const ctxWeights = canvasWeights.getContext('2d');
const ctxWeights2 = canvasWeights2.getContext('2d');
const ctxDijkstra = canvasDijkstra.getContext('2d');
const ctxKruskal = canvasKruskal.getContext('2d');

ctxDir.font = '20px Times New Roman';
ctxNotDir.font = '20px Times New Roman';
ctxWeights.font = '20px Georgia';
ctxWeights2.font = '20px Georgia';
ctxDijkstra.font = '20px Times New Roman';
ctxKruskal.font = '20px Times New Roman';


function dirNotDir() {
  if (canvasDir.style.display === 'block') {
    canvasNotDir.style.display = 'block';
    canvasWeights.style.display = 'block';
    canvasDir.style.display = 'none';
  } else {
    canvasNotDir.style.display = 'none';
    canvasWeights.style.display = 'none';
    canvasDir.style.display = 'block';
  }
}

function dijkstraRun() {
  butDijkstra.disabled = true;
  canvasDijkstra.style.display = 'block';
  canvasKruskal.style.display = 'none';
  dijkstra(notDirGraph, ctxDijkstra);
}

function kruskalRun() {
  butKruskalAlgorithm.disabled = true;
  clearCanvas(canvasKruskal);
  canvasKruskal.style.display = 'block';
  canvasDijkstra.style.display = 'none';

  drawNotDirGraph(notDirGraph, ctxKruskal);
  visualizeKruskalAlgo(ctxKruskal, treeKruskal, delayHalt);
}
