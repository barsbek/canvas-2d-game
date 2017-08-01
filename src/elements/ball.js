class Ball {
  constructor(ctx, canvas, color='green') {
    this.ctx = ctx;
    this.canvas = canvas;
    this.color = color;
    this.radius = Math.min(canvas.width, canvas.height)*0.02;
    this.center = {
      x: canvas.width*0.5,
      y: canvas.height - this.radius
    }
    const delta = this.radius*0.6;
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
    this.checkBorders();
    this.center = {
      x: this.center.x - this.delta.x,
      y: this.center.y - this.delta.y
    }
  }

  checkBorders() {
    const canvas = this.canvas;
    const center = this.center;
    const radius = this.radius;
    if(canvas.width < center.x + radius || center.x - radius < 0) {
      this.delta.x = -this.delta.x;
    } else if(canvas.height < center.y + radius || center.y - radius < 0) {
        this.delta.y = -this.delta.y;
    }
  }
}

module.exports = Ball;
