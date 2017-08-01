class Brick {
  constructor(position, size, color='green') {
    this.position = position;
    this.size = size;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.rect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    );
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
module.exports = Brick;
