'use strict';

import Game from '../modules/Game.class.js';

const game = new Game();

const startBtn = document.querySelector('.button--start');

function render() {
  const cells = document.querySelectorAll('.field-cell');

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const index = row * 4 + col;
      const value = game.board[row][col];
      const cell = cells[index];

      cell.textContent = value === 0 ? '' : value;
      cell.className = 'field-cell';

      if (value !== 0) {
        cell.classList.add(`field-cell--${value}`);
      }
    }
  }
}

function updateScoreUI() {
  const uiScore = document.querySelector('.game-score');

  uiScore.textContent = game.getScore();
}

function checkGameStatus() {
  const gameStatus = game.getStatus();

  const winMsg = document.querySelector('.message-win');
  const loseMsg = document.querySelector('.message-lose');
  const startMsg = document.querySelector('.message-start');

  // Ukrywamy wszystkie komunikaty
  winMsg.classList.add('hidden');
  loseMsg.classList.add('hidden');
  startMsg.classList.add('hidden');

  if (gameStatus === 'win') {
    winMsg.classList.remove('hidden');
  } else if (gameStatus === 'lose') {
    loseMsg.classList.remove('hidden');
  } else if (gameStatus === 'idle') {
    startMsg.classList.remove('hidden');
  }
}

startBtn.addEventListener('click', () => {
  if (startBtn.classList.contains('restart')) {
    game.restart();
  } else {
    game.start();
  }

  render();
  updateScoreUI();
  checkGameStatus();
});

document.addEventListener('keydown', (ev) => {
  let moved = false;

  switch (ev.key) {
    case 'ArrowLeft':
      game.moveLeft();
      moved = true;
      break;
    case 'ArrowRight':
      game.moveRight();
      moved = true;
      break;
    case 'ArrowUp':
      game.moveUp();
      moved = true;
      break;
    case 'ArrowDown':
      game.moveDown();
      moved = true;
      break;
  }

  if (moved) {
    render();
    updateScoreUI();
    checkGameStatus();
  }
});
