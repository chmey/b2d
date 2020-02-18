var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const bh = canvas.height;
const bw = canvas.width;

const recvMargin = 80;
const recvRadius = 20;
const recvColor = "blue";

const toolRadius = 15;
const toolColor = 'orange';

const simulate = false;

function drawDot(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.fillStyle = color;
  ctx.fill();
}

function update() {
  console.log("Update...");
  ctx.clearRect(0, 0, bw, bh);

  drawDot(recvMargin, recvMargin, recvRadius, recvColor);
  drawDot(recvMargin, bh-recvMargin, recvRadius, recvColor);
  drawDot(bw-recvMargin, recvMargin, recvRadius, recvColor);
  drawDot(bw-recvMargin, bh-recvMargin, recvRadius, recvColor);


  if(simulate) {
    drawDot(Math.random()*(bw-recvMargin)+recvMargin, Math.random()*(bh-recvMargin)+recvMargin, toolRadius, toolColor);
  } else {
    drawDot(400, 300, toolRadius, toolColor);
  }
}


// setInterval(update, 200);
update();


