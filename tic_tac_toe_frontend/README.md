# Tic Tac Toe Frontend (React)

A minimalistic, modern UI for a 2-player local Tic Tac Toe game built with React and vanilla CSS.

## Features

- 2-player local mode (X vs O)
- Central 3x3 board with responsive layout
- Player indicators above the board
- Status bar below (current turn, win, or draw)
- Restart button
- Light theme with the specified colors:
  - Primary: `#1976d2`
  - Accent: `#ffd600`
  - Secondary: `#eeeeee`

## Getting Started

In the project directory:

### `npm start`
Run the app in development mode.
Open http://localhost:3000 to view it in your browser.

### `npm test`
Launch the test runner.

### `npm run build`
Build the app for production to the `build` folder.

## Code Overview

- `src/App.js`: Main app with game logic (board state, win/draw detection, restart).
- `src/App.css`: Minimalistic styling and theme variables.
- `src/index.js`: React entry point.

## Notes

No external UI frameworks are used; the UI is crafted with CSS for fast load and simplicity.
