document.addEventListener('DOMContentLoaded', init);

const Control = require('./elements/control');
const Ball = require('./elements/ball');


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
    this.ball = new Ball(this.ctx, this.canvas);
  }

  drawElements() {
    this.control.draw();
    this.ball.draw();
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ball.move();
    this.drawElements();
    requestAnimationFrame(this.redraw.bind(this));
  }

  initListeners() {
    window.addEventListener('resize', () => {
      this.initCanvas();
      this.initElements();
      this.drawElements();
    });

    document.addEventListener('keydown', e => {
      if(e.keyCode == 'A'.charCodeAt()) this.control.moveLeft();
      else if(e.keyCode == 'D'.charCodeAt()) this.control.moveRight();
    });

    document.addEventListener('keyup', e => {
      this.control.stop();
    });
  }
}
