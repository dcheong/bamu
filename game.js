var sceneCanvas;
var sceneChange;
var s;

var uiCanvas;
var u;


var FPS;

var mouseX;
var mouseY;

var loaded;

var tree;




document.onclick = function(e) {
  drawOnPlanet(s, sceneCanvas);
  sceneChange = true;
}

window.onload = function() {
  init();
  setInterval(function() {
    updateScene();
    updateUI();
  }, 1000/60);
  document.getElementById("ui").onmousemove = function(e) {
    console.log('mouse move');
    mouseX = e.clientX;
    mouseY = e.clientY;
  }
}

function init() {
  FPS = 60;

  sceneCanvas = document.getElementById('scene');
  s = sceneCanvas.getContext('2d');
  s.canvas.width = window.innerWidth * 0.75;
  s.canvas.height = window.innerHeight;
  console.log('scene-main initialized');
  sceneChange = true;

  uiCanvas = document.getElementById('ui');
  u = uiCanvas.getContext('2d');
  u.canvas.width = window.innerWidth * 0.75;
  u.canvas.height = window.innerHeight;
  u.globalAlpha=(0.5)
  console.log('scene-ui initialized');

  mouseX = 0;
  mouseY = 0;

  loaded = false;

  tree = new Image();
  tree.src = './img/tree.png';
  tree.onload = function () {
    loaded = true;
  }
}

function updateScene() {
  if(sceneChange) {
    drawScene();
  }
}

function updateUI() {
  drawUI();
  drawOnPlanet(u, uiCanvas);
}

function drawBG(context) {
}

function drawScene() {
  s.beginPath();
  s.arc(sceneCanvas.width/2, sceneCanvas.height/2, 70, 0, 2*Math.PI, false);
  s.lineWidth = 5;
  s.strokeStyle = '#000000';
  s.stroke();
  sceneChange = false;
}

function drawUI() {
  u.clearRect(0,0,u.canvas.width, u.canvas.height);
}

function drawOnPlanet(context, canvas) {
  var centerX = canvas.width/2;
  var centerY = canvas.height/2;
  var diffX = mouseX - centerX;
  var diffY = mouseY - centerY;
  var hyp = Math.sqrt(diffX^2 + diffY^2);
  var angle = Math.atan(diffY/diffX);
  if (diffX == 0) {
    angle = Math.PI/2;
  }
  angle = angle - Math.PI/2;
  if (diffX > 0) {
    angle = angle + Math.PI;
  }
  context.translate(centerX, centerY);
  context.rotate(angle);
  context.drawImage(tree, 0, -70 - tree.naturalHeight);
  context.rotate(-angle);
  context.translate(-centerX, -centerY);
}