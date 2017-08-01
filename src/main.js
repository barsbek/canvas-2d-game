document.addEventListener('DOMContentLoaded', init);

const Control = require('./elements/control');

function init() {
  const canvas = document.querySelector('#plot');
  const ctx = canvas.getContext('2d');
  [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];

  const control = new Control(ctx, canvas);
  control.draw();

  document.addEventListener('resize', () => {
    [canvas.width, canvas.height] = [window.innerWidth, window.innerHeight];
    controls.draw();
  });

  document.addEventListener('keydown', e => {
    if(e.keyCode == 'A'.charCodeAt()) control.moveLeft();
    else if(e.keyCode == 'D'.charCodeAt()) control.moveRight();
  });

  document.addEventListener('keyup', e => {
    control.stop();
  })

  function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    control.draw();
    requestAnimationFrame(redraw);
  }
  requestAnimationFrame(redraw);
}
