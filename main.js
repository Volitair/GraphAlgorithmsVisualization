'use strict';

const center = centerCalculate(widthGraph, heightGraph);
const symmetrMatrix = symmetryMatrix(matrix);

const dirGraph = new DirectedGraph(matrix);
dirGraph.createVertexObj();
dirGraph.createGraphElements();

drawDirGraph(dirGraph, ctxDir);

const notDirGraph = new NotDirectedGraph(symmetrMatrix);
notDirGraph.createVertexObj();
notDirGraph.createGraphElements();

drawNotDirGraph(notDirGraph, ctxNotDir);
drawNotDirGraph(notDirGraph, ctxDijkstra);


notDirGraph.setWeights(weightsMatrix);
notDirGraph.drawAllWeights(ctxWeights);
notDirGraph.drawAllWeights(ctxWeights2);


const kruskal = new Kruskal(notDirGraph);
const treeKruskal = kruskal.kruskalMST();
