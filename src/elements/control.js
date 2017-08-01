class Control {
  constructor(ctx, canvas, color='green') {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = Math.max(canvas.width/10, 40);
    this.height = Math.max(canvas.height/30, 10);
    this.color = color;
    this.position = {
      x: (this.canvas.width - this.width)*0.5,
      y: this.canvas.height - this.height
    }
    this.dx = canvas.width*0.01;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
    this.ctx.closePath();
  }

  moveLeft() {
    this.move(-this.dx);
  }

  moveRight() {
    this.move(this.dx);
  }

  stop() {
    this.move(0);
  }

  move(dx) {
    this.position.x += dx;
    this.stopOnBorders();
  }

  stopOnBorders() {
    if(this.position.x + this.width >= this.canvas.width) {
      this.position.x = this.canvas.width - this.width;
    } else if(this.position.x <= 0) {
      this.position.x = 0;
    }
  }
}

module.exports = Control;
