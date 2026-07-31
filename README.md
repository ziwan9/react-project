# Game Arcade — School Project

A small React site with a portfolio-style layout (Home / About / Skills) plus
a "Games" section containing three playable games, each as its own component.

## Structure

```
src/
  main.jsx              entry point
  index.css             global theme variables + reset
  App.jsx / App.css      root layout
  components/
    Navbar.jsx / .css
    Hero.jsx / .css       (Home section)
    About.jsx / .css
    Skills.jsx / .css
    Arcade.jsx / .css     (tab switcher that mounts the 3 games)
    Footer.jsx / .css
    shared/
      GameHeader.jsx      (title + subtitle, reused by all 3 games)
      ScoreChip.jsx       (small stat card, reused by all 3 games)
      shared.css
  games/
    NumberGuessGame.jsx / .css
    TicTacToe.jsx / .css
    ChessGame.jsx / .css
    chessLogic.js         (move-generation helpers, no UI code)
```

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL (usually http://localhost:5173).

## Build for submission

```bash
npm run build
```

Outputs a static `dist/` folder you can zip up or host anywhere.

## Notes on the chess game

It supports full legal-looking movement for every piece (pawns, knights,
bishops, rooks, queens, kings), turn order, captures, a check indicator, and
auto-promotes pawns to queens. Castling, en passant, and full
checkmate/stalemate detection are intentionally left out to keep the scope
reasonable for a school project.
