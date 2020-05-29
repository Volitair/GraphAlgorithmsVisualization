'use strict';

const canvasDir = document.getElementById('cDirGraph');
const canvasNotDir = document.getElementById('cNotDirCraph');
const canvasWeights = document.getElementById('weights');

const ctxDir = canvasDir.getContext('2d');
const ctxNotDir = canvasNotDir.getContext('2d');
const ctxWeights = canvasWeights.getContext('2d');

ctxDir.font = '20px Times New Roman';
ctxNotDir.font = '20px Times New Roman';
ctxWeights.font = '22px Times New Roman';
