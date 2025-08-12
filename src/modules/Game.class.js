'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */

export default class Game {
  /**
   * Creates a new game instance.
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    // eslint-disable-next-line no-console
    this.initialState = initialState;

    this.board = this.initialState
      ? this.initialState.map((row) => [...row])
      : (this.board = Array.from({ length: 4 }, () => [0, 0, 0, 0]));
    this.score = 0;
    this.status = 'playing';
  }

  addRandomTile() {
    const emptyCells = [];

    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) {
        if (this.board[r][c] === 0) {
          emptyCells.push({ row: r, col: c });
        }
      }
    }

    if (emptyCells.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const { row, col } = emptyCells[randomIndex];

    const newValue = Math.random() < 0.9 ? 2 : 4;

    this.board[row][col] = newValue;
  }

  moveLeft() {
    let anyChanged = false;

    this.board.forEach((row, index) => {
      const beforeRes = [...row];
      const withoutZeros = row.filter((num) => num !== 0);

      for (let i = 0; i < withoutZeros.length - 1; i++) {
        if (withoutZeros[i] === withoutZeros[i + 1]) {
          withoutZeros[i] = withoutZeros[i] + withoutZeros[i + 1];
          this.score += withoutZeros[i];
          withoutZeros[i + 1] = 0;
          i++;
        }
      }

      const withoutZerosFinal = withoutZeros.filter((num) => num !== 0);

      while (withoutZerosFinal.length < 4) {
        withoutZerosFinal.push(0);
      }

      const changed = beforeRes.some(
        (val, idx) => val !== withoutZerosFinal[idx],
      );

      if (changed) {
        anyChanged = true;
      }

      this.board[index] = withoutZerosFinal;
    });

    if (anyChanged) {
      this.addRandomTile();
    }
  }

  moveRight() {
    let anyChanged = false;

    this.board.forEach((row, index) => {
      const beforeRes = [...row];
      const reversed = [...row].reverse();
      const withoutZeros = reversed.filter((num) => num !== 0);

      for (let i = 0; i < withoutZeros.length - 1; i++) {
        if (withoutZeros[i] === withoutZeros[i + 1]) {
          withoutZeros[i] = withoutZeros[i] + withoutZeros[i + 1];
          this.score += withoutZeros[i];
          withoutZeros[i + 1] = 0;
          i++;
        }
      }

      let withoutZerosFinal = withoutZeros.filter((num) => num !== 0);

      while (withoutZerosFinal.length < 4) {
        withoutZerosFinal.push(0);
      }

      withoutZerosFinal = withoutZerosFinal.reverse();

      const changed = beforeRes.some(
        (val, idx) => val !== withoutZerosFinal[idx],
      );

      if (changed) {
        anyChanged = true;
      }

      this.board[index] = withoutZerosFinal;
    });

    if (anyChanged) {
      this.addRandomTile();
    }
  }

  moveUp() {
    let anyChanged = false;
    const transposed = [[], [], [], []];

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        transposed[j][i] = this.board[i][j];
      }
    }

    transposed.forEach((row, index) => {
      const beforeRes = [...row];
      const withoutZeros = row.filter((num) => num !== 0);

      for (let i = 0; i < withoutZeros.length - 1; i++) {
        if (withoutZeros[i] === withoutZeros[i + 1]) {
          withoutZeros[i] = withoutZeros[i] + withoutZeros[i + 1];
          this.score += withoutZeros[i];
          withoutZeros[i + 1] = 0;
          i++;
        }
      }

      const withoutZerosFinal = withoutZeros.filter((num) => num !== 0);

      while (withoutZerosFinal.length < 4) {
        withoutZerosFinal.push(0);
      }

      const changed = beforeRes.some(
        (val, idx) => val !== withoutZerosFinal[idx],
      );

      if (changed) {
        anyChanged = true;
      }

      transposed[index] = withoutZerosFinal;
    });

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.board[i][j] = transposed[j][i];
      }
    }

    if (anyChanged) {
      this.addRandomTile();
    }
  }

  moveDown() {
    let anyChanged = false;
    const transposed = [[], [], [], []];

    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        transposed[j][i] = this.board[i][j];
      }
    }

    transposed.forEach((row, index) => {
      const beforeRes = [...row];
      const reversed = [...row].reverse();
      const withoutZeros = reversed.filter((num) => num !== 0);

      for (let i = 0; i < withoutZeros.length - 1; i++) {
        if (withoutZeros[i] === withoutZeros[i + 1]) {
          withoutZeros[i] = withoutZeros[i] + withoutZeros[i + 1];
          this.score += withoutZeros[i];
          withoutZeros[i + 1] = 0;
          i++;
        }
      }

      let withoutZerosFinal = withoutZeros.filter((num) => num !== 0);

      while (withoutZerosFinal.length < 4) {
        withoutZerosFinal.push(0);
      }

      withoutZerosFinal = withoutZerosFinal.reverse();

      const changed = beforeRes.some(
        (val, idx) => val !== withoutZerosFinal[idx],
      );

      if (changed) {
        anyChanged = true;
      }

      transposed[index] = withoutZerosFinal;
    });

    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        this.board[i][j] = transposed[j][i];
      }
    }

    if (anyChanged) {
      this.addRandomTile();
    }
  }

  checklose() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (this.board[row][col] === 0) {
          return false;
        }
      }
    }

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if (col < 3 && this.board[row][col] === this.board[row][col + 1]) {
          return false;
        }

        if (row < 3 && this.board[row][col] === this.board[row + 1][col]) {
          return false;
        }
      }
    }

    this.status = 'lose';

    return true;
  }

  checkWin() {
    for (const row of this.board) {
      for (const cell of row) {
        if (cell === 2048) {
          this.status = 'win';
          document.querySelector('.message-win').classList.remove('hidden');

          return;
        }
      }
    }
  }

  /**
   * @returns {number}
   */

  getScore() {
    return this.score;
  }

  updateScore() {
    const uiScore = document.querySelector('.game-score');

    uiScore.textContent = this.score;
  }

  /**
   * @returns {number[][]}
   */

  getState() {
    return this.board.map((row) => [...row]);
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.status;
  }

  start() {
    this.score = 0;
    this.status = 'playing';
    this.board = Array.from({ length: 4 }, () => [0, 0, 0, 0]);
    this.addRandomTile();
    this.addRandomTile();

    const start = document.querySelector('.start');
    const startMsg = document.querySelector('.message-start');

    start.classList.remove('start');
    start.classList.add('restart');
    start.textContent = 'Restart';

    startMsg.classList.add('hidden');
  }

  restart() {
    this.score = 0;
    this.status = 'playing';

    this.board = Array.from({ length: 4 }, () => [0, 0, 0, 0]);

    const restart = document.querySelector('.restart');
    const startMsg = document.querySelector('.message-start');
    const loseMsg = document.querySelector('.message-lose');
    const winMsg = document.querySelector('.message-win');

    loseMsg.classList.add('hidden');
    startMsg.classList.remove('hidden');
    winMsg?.classList.add('hidden');

    restart.classList.add('start');
    restart.classList.remove('restart');
    restart.textContent = 'Start';
  }
}

// Add your own methods here
