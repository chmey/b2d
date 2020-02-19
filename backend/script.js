var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const bh = canvas.height;
const bw = canvas.width;

const recvMargin = 80;
const recvRadius = 20;
const recvColor = "blue";

const toolRadius = 12;
const toolColor = 'orange';
const toolTrack = [
                    // idle in middle
                    {x: 400, y: 300}, {x:410, y:290}, {x: 390, y: 310},
                    {x: 380, y: 300}, {x:390, y:280}, {x: 375, y: 290},
                    {x: 385, y: 290}, {x:390, y:280}, {x: 400, y: 310},
                    {x: 405, y: 315}, {x:400, y:310}, {x: 410, y: 310},
                    {x: 415, y: 305}, {x:420, y:300}, {x: 410, y: 310},
                    // walk with me
                    {x: 415, y: 300}, {x:425, y:305}, {x: 435, y: 305},
                    {x: 445, y: 300}, {x:455, y:305}, {x: 465, y: 310},
                    {x: 475, y: 310}, {x:480, y:315}, {x: 485, y: 310},
                    {x: 495, y: 305}, {x:505, y:295}, {x: 515, y: 300},
                    {x: 525, y: 300}, {x:555, y:305}, {x: 575, y: 300},

                    {x: 565, y: 310}, {x:585, y:320}, {x: 595, y: 330},
                    {x: 595, y: 350}, {x:600, y:325}, {x: 585, y: 300},
                    {x: 600, y: 300}, {x:600, y:305}, {x: 620, y: 300},

                    {x: 630, y: 295}, {x:635, y:280}, {x: 655, y: 300},
                    {x: 680, y: 310}, {x:670, y:305}, {x: 650, y: 300},
                    {x: 640, y: 290}, {x:650, y:285}, {x: 655, y: 275},
                    {x: 635, y: 260}, {x:630, y:275}, {x: 640, y: 280},
                    {x: 645, y: 270}, {x:620, y:250}, {x: 630, y: 240},
                    {x: 645, y: 250}, {x:625, y:245}, {x: 640, y: 240},
                    {x: 650, y: 235}, {x:645, y:225}, {x: 640, y: 230},
                    {x: 645, y: 270}, {x:620, y:250}, {x: 630, y: 240},
                    {x: 645, y: 250}, {x:625, y:245}, {x: 640, y: 240},
                    {x: 650, y: 235}, {x:645, y:225}, {x: 640, y: 230},






                  ]
var seriesIndex = 0;
const simulate = false;

function drawDot(x, y, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI, true);
  ctx.fillStyle = color;
  ctx.fill();
}

async function update() {
  console.log("Update...");
  ctx.clearRect(0, 0, bw, bh);

  drawDot(recvMargin, recvMargin, recvRadius, recvColor);
  drawDot(recvMargin, bh-recvMargin, recvRadius, recvColor);
  drawDot(bw-recvMargin, recvMargin, recvRadius, recvColor);
  drawDot(bw-recvMargin, bh-recvMargin, recvRadius, recvColor);


  if(simulate) {
    drawDot(
      toolTrack[seriesIndex % toolTrack.length].x,
      toolTrack[seriesIndex++ % toolTrack.length].y,
      toolRadius,
      toolColor
    );

    // drawDot(
      // Math.random() * (bw-recvMargin)+recvMargin,
      // Math.random() * (bh-recvMargin)+recvMargin, toolRadius, toolColor
    // );
  } else {
    let {x, y} = await (await fetch('/getToolPos?toolId=1.2')).json();
    console.log("await: ", x, y);

    drawDot((bw-recvMargin)*x + recvMargin, (bh-recvMargin)*y + recvMargin, toolRadius, toolColor);
  }

  setTimeout(update, 200);
}

// setInterval(update, 350);
update();
