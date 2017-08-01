class Control {
  constructor(ctx, canvas, color='green') {
    this.ctx = ctx;
    this.canvas = canvas;
    this.width = Math.max(canvas.width/20, 80);
    this.height = Math.max(canvas.height/20, 20);
    this.color = color;
    this.position = {
      x: (this.canvas.width - this.width)*0.5,
      y: this.canvas.height - this.height*2
    }
    this.dx = this.width*0.4;
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
