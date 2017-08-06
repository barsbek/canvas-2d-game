const Control = require('./control');
const Ball = require('./ball');
const Brick = require('./brick');

class Game {
  constructor(canvas) {
    if(canvas.tagName == 'canvas'.toUpperCase()) {
      this.canvas = canvas;
    } else {
      throw new Error('Canvas element is not found');
    }
    this.ctx = canvas.getContext('2d');
    this.bricksNumber = {x: 4, y: 4};
    this.bricks = [];
    this.score = {
      value: 0,
      position: {x: 10, y: 10},
      size: 0.05*this.canvas.height
    };
    this.animationFrame = null;
  }

  start() {
    this.initCanvas();
    this.initElements();
    this.initListeners();
    this.animationFrame = requestAnimationFrame(this.redraw.bind(this));
  }

  restart() {
    this.score.value = 0;
    this.bricks = [];
    this.initElements();
    cancelAnimationFrame(this.animationFrame);
    this.animationFrame = requestAnimationFrame(this.redraw.bind(this));
  }

  initCanvas() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initElements() {
    this.control = new Control(this.ctx, this.canvas);
    this.ball = new Ball(this.ctx, this.canvas, this.control);
    this.initBricks();
  }

  initBricks() {
    const area = {
      x: this.canvas.width/this.bricksNumber.x,
      y: this.canvas.height/this.bricksNumber.y*0.3
    };
    const margin = {x: 0.2*area.x, y: 0.4*area.y};
    const size = {width: area.x - margin.x, height: area.y - margin.y};

    this.score.position = {x: margin.x*0.5, y: margin.y*0.5};
    margin.y = margin.y + this.score.size;

    for(let x=0; x<this.bricksNumber.x; x++) {
      for(let y=0; y<this.bricksNumber.y; y++) {
        let position = {x: x*area.x + margin.x/2, y: y*area.y+margin.y};
        this.bricks.push(new Brick(position, size));
      }
    }
  }

  drawElements() {
    this.control.draw();
    this.ball.draw();
    this.drawBricks();
  }

  drawBricks() {
    for(let i in this.bricks) {
      const brick = this.bricks[i];
      brick.draw(this.ctx);
    }
  }

  drawResult(result) {
    let color = 'green';
    if(!result) result = `Score: ${this.score.value}`;
    else {
      color = 'red';
      result += ' Press spacebar to restart'
    }

    this.ctx.font = `${this.score.size}px Arial`;
    this.ctx.fillStyle = color;
    this.ctx.textBaseline = "top";
    this.ctx.fillText(result, this.score.position.x, this.score.position.y);
  }

  removeBrick() {
    let index = this.ball.hitBrick(this.bricks);
    if(index || index === 0) {
      this.bricks.splice(index, 1);
      this.score.value++;
    }
  }

  win() {
    const bricksNumber = this.bricksNumber.x*this.bricksNumber.y;
    if(this.score.value == bricksNumber) return true;
    else return false;
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let result, moved = this.ball.move();
    this.removeBrick();
    this.drawElements();

    if(this.win()) {
      result = 'You win!';
    } else if(moved) {
      this.animationFrame = requestAnimationFrame(this.redraw.bind(this));
    } else {
      result = 'You lost!';
    }
    this.drawResult(result);
  }

  initListeners() {
    window.addEventListener('resize', () => {
      this.initCanvas();
      this.initElements();
      this.drawElements();
    });

    document.addEventListener('keydown', e => {
      if(e.keyCode == 'A'.charCodeAt() || e.keyCode == 37)
        this.control.moveLeft();
      else if(e.keyCode == 'D'.charCodeAt() || e.keyCode == 39)
        this.control.moveRight();
      else if(e.keyCode == 32)
        this.restart();
    });

    document.addEventListener('keyup', e => {
      this.control.stop();
    });

    this.canvas.onmousemove = (e) => {
      this.control.position.x = e.pageX - this.control.width/2;
      this.control.stopOnBorders();
    }
  }
}

module.exports = Game;
