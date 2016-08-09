var sceneCanvas;
var s;

var uiCanvas;
var u;
var uiRedraw;

var FPS;

window.onload = function() {
  init();
  setInterval(function() {
    updateScene();
    drawScene();
    updateUI();
  }, 1000/60);
}

function init() {
  FPS = 60;

  sceneCanvas = document.getElementById('scene');
  s = sceneCanvas.getContext('2d');
  s.canvas.width = window.innerWidth;
  s.canvas.height = window.innerHeight;
  console.log('scene-main initialized');

  uiCanvas = document.getElementById('ui');
  u = uiCanvas.getContext('2d');
  u.canvas.width = window.innerWidth;
  u.canvas.height = window.innerHeight;
  console.log('scene-ui initialized');
}

function updateScene() {

}

function updateUI() {

}

function drawScene() {
  s.beginPath();
  s.arc(sceneCanvas.width/2, sceneCanvas.height/2, 70, 0, 2*Math.PI, false);
  s.lineWidth = 5;
  s.strokeStyle = '#000000';
  s.stroke();
}

function drawUI() {

}