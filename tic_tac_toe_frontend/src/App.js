import React, { useMemo, useState } from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * App is the main component rendering a 2-player local Tic Tac Toe game.
 * It provides:
 * - Central 3x3 board
 * - Player indicators above
 * - Status bar below
 * - Restart button
 * - Minimalistic light-mode UI with the specified color theme
 */
function App() {
  // Board is a 9-length array with 'X' | 'O' | null
  const [board, setBoard] = useState(Array(9).fill(null));
  // true => X's turn, false => O's turn
  const [xIsNext, setXIsNext] = useState(true);

  // Determine winner and winning line
  const { winner, winningLine } = useMemo(() => calculateWinner(board), [board]);

  // Determine if draw (no empty cells and no winner)
  const isDraw = useMemo(() => !winner && board.every((c) => c !== null), [board, winner]);

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    /** Handle a move: ignore if already filled or game is over. */
    if (board[index] || winner) return;
    const next = board.slice();
    next[index] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext((prev) => !prev);
  };

  // PUBLIC_INTERFACE
  const handleRestart = () => {
    /** Reset the game to initial state. */
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const currentPlayer = xIsNext ? 'X' : 'O';

  let statusText = '';
  if (winner) {
    statusText = `Player ${winner} wins!`;
  } else if (isDraw) {
    statusText = 'It’s a draw.';
  } else {
    statusText = `Player ${currentPlayer}'s turn`;
  }

  return (
    <div className="App ttt-app">
      <header className="ttt-header">
        <h1 className="ttt-title">Tic Tac Toe</h1>
        <div className="ttt-players">
          <PlayerIndicator label="Player X" active={!winner && !isDraw && currentPlayer === 'X'} symbol="X" />
          <PlayerIndicator label="Player O" active={!winner && !isDraw && currentPlayer === 'O'} symbol="O" />
        </div>
      </header>

      <main className="ttt-main">
        <Board
          board={board}
          onClick={handleSquareClick}
          winningLine={winningLine}
        />
      </main>

      <footer className="ttt-footer">
        <div className="ttt-status" role="status" aria-live="polite">
          {statusText}
        </div>
        <button className="ttt-btn ttt-btn-restart" onClick={handleRestart} aria-label="Restart the game">
          Restart
        </button>
      </footer>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * PlayerIndicator shows the player label and indicates when it is active.
 */
function PlayerIndicator({ label, active, symbol }) {
  return (
    <div className={`player-indicator ${active ? 'active' : ''}`} aria-current={active ? 'true' : 'false'}>
      <span className="player-symbol" aria-hidden="true">{symbol}</span>
      <span className="player-label">{label}</span>
      {active && <span className="player-active-dot" aria-hidden="true" />}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Board renders the 3x3 grid of squares. Highlights the winning line.
 */
function Board({ board, onClick, winningLine }) {
  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {board.map((value, idx) => {
        const isWinning = winningLine?.includes(idx);
        return (
          <button
            key={idx}
            role="gridcell"
            aria-label={`Cell ${idx + 1}${value ? `, ${value}` : ''}`}
            className={`square ${isWinning ? 'square-win' : ''} ${value ? `square-${value}` : ''}`}
            onClick={() => onClick(idx)}
            disabled={!!value || !!winningLine}
          >
            {value}
          </button>
        );
      })}
    </div>
  );
}

/**
 * Determine the winner of the board and return both the winner ('X'|'O'|null)
 * and the winning line indices when present.
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // columns
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningLine: [a, b, c] };
    }
  }
  return { winner: null, winningLine: null };
}

export default App;
