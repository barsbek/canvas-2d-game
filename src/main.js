document.addEventListener('DOMContentLoaded', init);

const Control = require('./elements/control');
const Ball = require('./elements/ball');
const Brick = require('./elements/brick');

function init() {
  const canvas = document.querySelector('#plot');
  const game = new Game(canvas);
  game.start();
}

class Game {
  constructor(canvas) {
    if(canvas.tagName == 'canvas'.toUpperCase()) {
      this.canvas = canvas;
    } else {
      throw new Error('Canvas element is not found');
    }
    this.ctx = canvas.getContext('2d');
    this.bricksNumber = {x: 8, y: 3};
    this.bricks = [];
  }

  start() {
    this.initCanvas();
    this.initElements();
    this.initListeners();
    requestAnimationFrame(this.redraw.bind(this));
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

  removeBrick() {
    let index = this.ball.hitBrick(this.bricks);

    if(index || index === 0) {
      this.bricks.splice(index, 1);
    }
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    let result = this.ball.move();
    this.removeBrick();
    this.drawElements();
    if(result)
      requestAnimationFrame(this.redraw.bind(this));
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
    });

    document.addEventListener('keyup', e => {
      this.control.stop();
    });
  }
}
