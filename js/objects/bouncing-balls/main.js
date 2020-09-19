// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

class Ball {
  constructor(x, y, velX, velY, color, radius) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if((this.x + this.radius) >= width) {
      this.velX = -(this.velX);
    }

    if((this.x - this.radius) <= 0) {
      this.velX = -(this.velX);
    }

    if((this.y + this.radius) >= height) {
      this.velY = -(this.velY);
    }

    if((this.y - this.radius) <= 0) {
      this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  detectCollision() {
    for(let j = 0; j < balls.length; j++) {
      if(this !== balls[j]) {
        const dx = this.x - balls[j].x;
        const dy = this.y - balls[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if(dist < this.radius + balls[j].radius) {
          balls[j].color = this.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
        }
      }
    }
  }
}

const balls = [];
while(balls.length < 25) {
  const radius = random(10, 20);
  const ball = new Ball(
    random(radius, width - radius),
    random(radius, height - radius),
    random(-7, 7),
    random(-7, 7),
    `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
    radius);
  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].detectCollision(balls);
  }

  requestAnimationFrame(loop);
}

loop();
