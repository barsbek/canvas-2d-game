class Control {
  constructor(ctx, canvas, color='green') {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = Math.max(canvas.width/20, 40);
    this.height = Math.max(canvas.height/20, 10);
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
  }
}

module.exports = Control;
