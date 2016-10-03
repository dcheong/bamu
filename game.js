var sceneCanvas;
var sceneChange;
var s;

var uiCanvas;
var u;


var FPS;

var mouseX;
var mouseY;

var loaded;

var textures = [
  './img/tree.png',
  './img/tree2.png'
];

var images = [];

var currentIndex = 0;

var radius = 70;


window.onload = function() {
  init();
  setInterval(function() {
    if (loaded) {
      updateScene();
      updateUI();
    }
  }, 1000/60);
  
  document.getElementById("ui").onmousemove = function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  };

  document.getElementById("ui").onclick = function(e) {
    drawOnPlanet(s,
      sceneCanvas,
      calcAngleToPosition(
        sceneCanvas.width/2,
        sceneCanvas.height/2,
        mouseX, mouseY
        )
      );
    sceneChange = true;
  };

  document.addEventListener("keypress", function(e) {
    switch (e.key) {
      case 'r':
        randomize(50);
        break;
      default:
    }
  });
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

  for (var i = 0; i < textures.length; i++) {
    console.log(textures.length);
    var path = textures[i];
    var id = 'object-' + i;
    var toAppend = $('<img id="' + id + '" src=' + path + '></img>');
    $(toAppend).on('click', function(e) {
      currentIndex = e.target.id.split('-')[1];
    });
    $('#control-table').append(toAppend);
    var temp = new Image();
    temp.src = path;
    images.push(temp);
    if (i === textures.length - 1) {
      temp.onload = function () {
        loaded = true;
      }
    }
  }
}

function updateScene() {
  if(sceneChange) {
    drawScene();
  }
}

function updateUI() {
  drawUI();
  drawOnPlanet(u,
      uiCanvas,
      calcAngleToPosition(
        uiCanvas.width/2,
        uiCanvas.height/2,
        mouseX, mouseY
        )
      );
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

function calcAngleToPosition(x1, y1, x2, y2) {
  var diffX = x2 - x1;
  var diffY = y2-y1;
  var hyp = Math.sqrt(diffX^2 + diffY^2);
  var angle = Math.atan(diffY/diffX);
  if (diffX == 0) {
    angle = Math.PI/2;
  }
  angle = angle - Math.PI/2;
  if (diffX > 0) {
    angle = angle + Math.PI;
  }
  return angle;
}

function randomize(population) {
  for (var i = 0; i < population; i++) {
    var randAngle = Math.random() * 2 * Math.PI;
    currentIndex = Math.floor(Math.random() * images.length);
    console.log(currentIndex)
    drawOnPlanet(s, sceneCanvas, randAngle);
  }
}

function drawOnPlanet(context, canvas, angle) {
  var image = images[currentIndex];
  centerX = canvas.width/2;
  centerY = canvas.height/2;
  context.save();
  context.translate(centerX, centerY);
  context.rotate(angle);
  context.drawImage(image, 0, -radius - image.naturalHeight);
  context.restore();
}