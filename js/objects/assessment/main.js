// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

const para = document.getElementsByTagName('p')[0];

const total = 25;
let count = 0;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

// define Shape constructor
function Shape(x, y, velX, velY, exists) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.exists = exists;
}

// define Ball constructor
function Ball(x, y, velX, velY, color, radius) {
  Shape.call(this, x, y, velX, velY, true);
  this.color = color;
  this.radius = radius;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.fill();
};

// define ball update method

Ball.prototype.update = function() {
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
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < this.radius + balls[j].radius) {
        balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
      }
    }
  }
};

// define EvilCircle constructor
function EvilCircle(x, y, radius) {
  Ball.call(this, x, y, 20, 20, 'white', radius, true);
}

EvilCircle.prototype = Object.create(Ball.prototype);
EvilCircle.prototype.constructor = EvilCircle;

EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.strokeStyle = this.color;
  ctx.lineWidth = 3;
  ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
  ctx.stroke();
};

EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.radius) >= width) {
    this.x -= this.radius;
  }

  if((this.x - this.radius) <= 0) {
    this.x += this.radius;
  }

  if((this.y + this.radius) >= height) {
    this.y -= this.radius;
  }

  if((this.y - this.radius) <= 0) {
    this.y += this.radius;
  }
};

EvilCircle.prototype.setControls = function() {
  const _this = this;
  window.onkeydown = function(e) {
    if(e.key === 'a') {
      _this.x -= _this.velX;
    } else if(e.key === 'd') {
      _this.x += _this.velX;
    } else if(e.key === 'w') {
      _this.y -= _this.velY;
    } else if(e.key === 's') {
      _this.y += _this.velY;
    }
  };
};

EvilCircle.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(balls[j].exists) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < this.radius + balls[j].radius) {
        balls[j].exists = false;
        count--;
        para.textContent = `Ball count: ${count}`;
      }
    }
  }
};

// define array to store balls and populate it

let balls = [];

while(balls.length < total) {
  const radius = random(10, 20);
  let ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the adge of the canvas, to avoid drawing errors
    random(0 + radius, width - radius),
    random(0 + radius, height - radius),
    random(-7, 7),
    random(-7, 7),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
    radius,
    true
  );

  balls.push(ball);

  count++;
  para.textContent = `Ball count: ${count}`;
}

const radius = random(10, 20);
const evilCircle = new EvilCircle(random(0 + radius, width - radius),
  random(0 + radius, height - radius), radius);
evilCircle.setControls();

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);


  for(let i = 0; i < balls.length; i++) {
    if(balls[i].exists) {
      balls[i].draw();
      balls[i].update();
      balls[i].collisionDetect();
    }

    evilCircle.draw();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
