const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const turnMessage = document.getElementById('turn-message');
const gameScreen = document.getElementById('game-screen');
const gameResultMessage = document.getElementById('game-result-message');
const newGameButton = document.getElementById('new-game-button');

let currentPlayer = 'X';
let gameEnded = false;
let winner = null;

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    if (!gameEnded && !cell.textContent) {
      cell.textContent = currentPlayer;
      if (checkWin(currentPlayer)) {
        gameEnded = true;
        displayGameResult(`Player ${currentPlayer} wins!`);
      } else if (checkDraw()) {
        gameEnded = true;
        displayGameResult("It's a draw!");
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        turnMessage.textContent = `Player ${currentPlayer}'s turn`;
      }
    }
  });
});

newGameButton.addEventListener('click', () => {
  resetGame();
});

function displayGameResult(message) {
  gameResultMessage.textContent = message;
  gameScreen.classList.remove('hidden');
}

function resetGame() {
  cells.forEach(cell => {
    cell.textContent = '';
  });
  currentPlayer = 'X';
  gameEnded = false;
  gameScreen.classList.add('hidden');
  turnMessage.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin(player) {
  return winningConditions.some(condition => {
    return condition.every(index => {
      return cells[index].textContent === player;
    });
  });
}

function checkDraw() {
  return [...cells].every(cell => {
    return cell.textContent !== '';
  });
}