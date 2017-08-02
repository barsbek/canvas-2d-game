const requestAnimationFrame = require('raf');

const Game = require('./elements/game');

document.addEventListener('DOMContentLoaded', init);

function init() {
  const canvas = document.querySelector('#plot');
  const game = new Game(canvas);
  game.start();
}
