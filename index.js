const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

window.addEventListener("resize", () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
});

let gravity = 1;
let friction = .9;
let ballArr = [];
let colorArr = [
    '#219ebc',
    '#ffb703',
    '#d90429',
    '#2a9d8f',
    '#0077b6',
    '#52796f',
    '#5e60ce',
    '#2d6a4f',
    '#d00000',
    '#ff8fab',
    '#f9844a',
    '#7b2cbf',
    '#ff0a54',
    '#38b000',
    '#f20089'
]


function Ball(x, y, dx, dy, radius) {

  this.x = x;
  this.dx = dx;
  this.y = y;
  this.dy = dy;
  this.radius = radius;
  this.color = colorArr[Math.floor(Math.random() * colorArr.length)]

  this.draw = function () {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle =  this.color;
    ctx.strokeStyle = "black";
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  };
  this.update = function () {
    this.draw();
    this.x += this.dx;
    this.y += this.dy;
    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * friction;
    } else {
      this.dy += gravity;
    }
    if(this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0){
        this.dx = -this.dx;
    }
  };
}

for (let i = 0; i < 50; i++) {

  let radius = Math.floor(Math.random() * (40 - 20 + 1)) + 20
  let x = Math.random() * (canvas.width - radius - 30) + 30;
  let y = Math.random() * canvas.height - radius;
  let dx = Math.floor(Math.random() * 5) - 2;
  ballArr.push(new Ball(x, y, dx, 3, radius));
}

function animate() {
  requestAnimationFrame(animate);

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < ballArr.length; i++) {
    ballArr[i].update();
  }
}

animate();

// Math.random() * (20 - 8 + 1) + 8