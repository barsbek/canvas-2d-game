class Ball {
  constructor(ctx, canvas, control, color='green') {
    this.ctx = ctx;
    this.canvas = canvas;
    this.control = control;
    this.color = color;
    this.radius = Math.min(canvas.width, canvas.height)*0.02;
    this.center = {
      x: canvas.width*0.5,
      y: canvas.height - this.radius - this.control.height - 1
    }

    const direction = [1, -1][Math.round(Math.random())];
    const delta = direction*this.radius*0.6;
    this.delta = {x: delta, y: delta};
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.center.x,
      this.center.y,
      this.radius,
      0, 2*Math.PI
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    if(this.touchedGround()) {
      return false;
    }

    this.correctDirection();
    this.center = {
      x: this.center.x - this.delta.x,
      y: this.center.y - this.delta.y
    }
    return true;
  }

  correctDirection() {
    if(this.touchedControl()){
      this.delta.y = -this.delta.y;
      const color = this.color;
      this.control.color = 'red';
    } else {
      this.control.color = 'green';
      this.bounceOnBorders();
    }
  }

  bounceOnBorders() {
    const canvas = this.canvas;
    const center = this.center;
    const radius = this.radius;
    if(canvas.width < center.x + radius || center.x - radius < 0) {
      this.delta.x = -this.delta.x;
    } else if(center.y - radius < 0) {
      this.delta.y = -this.delta.y;
    }
  }

  touchedGround() {
    if(this.canvas.height <= this.center.y + this.radius) return true;
    else return false;
  }

  touchedControl() {
    const control = this.control;
    if(control.position.x < this.center.x
      && this.center.x < control.position.x + control.width
      && control.position.y < this.center.y + this.radius
    ) return true;
    return false;
  }

  hitBrick(bricks) {
    for(let i in bricks) {
      const brick = bricks[i];
      let ballX, ballY, brickX, brickY;
      [ballX, ballY] = [this.center.x, this.center.y];
      [brickX, brickY] = [brick.position.x, brick.position.y];
      if(brickX < ballX && ballX < brickX + brick.size.width &&
        brickY < ballY && ballY < brickY + brick.size.height) {
          this.delta.y = -this.delta.y;
          return i;
      }
    }
    return false;
  }
}

module.exports = Ball;
