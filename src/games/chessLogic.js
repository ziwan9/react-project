export const PIECE_UNICODE = {
  wK: "♔", wQ: "♕", wR: "♖", wB: "♗", wN: "♘", wP: "♙",
  bK: "♚", bQ: "♛", bR: "♜", bB: "♝", bN: "♞", bP: "♟",
};

export function createInitialBoard() {
  const board = Array(8).fill(null).map(() => Array(8).fill(null));
  const backRank = ["R", "N", "B", "Q", "K", "B", "N", "R"];
  for (let c = 0; c < 8; c++) {
    board[0][c] = { type: backRank[c], color: "b" };
    board[1][c] = { type: "P", color: "b" };
    board[6][c] = { type: "P", color: "w" };
    board[7][c] = { type: backRank[c], color: "w" };
  }
  return board;
}

function inBounds(r, c) {
  return r >= 0 && r < 8 && c >= 0 && c < 8;
}

// Returns list of {r,c} squares a piece could move/attack to, ignoring check.
export function getPieceMoves(board, r, c, opts = { forAttack: false }) {
  const piece = board[r][c];
  if (!piece) return [];
  const moves = [];
  const push = (nr, nc) => {
    if (!inBounds(nr, nc)) return false;
    const target = board[nr][nc];
    if (!target) {
      moves.push({ r: nr, c: nc });
      return true;
    }
    if (target.color !== piece.color) moves.push({ r: nr, c: nc });
    return false;
  };
  const slide = (dirs) => {
    for (const [dr, dc] of dirs) {
      let nr = r + dr, nc = c + dc;
      while (inBounds(nr, nc)) {
        const target = board[nr][nc];
        if (!target) {
          moves.push({ r: nr, c: nc });
        } else {
          if (target.color !== piece.color) moves.push({ r: nr, c: nc });
          break;
        }
        nr += dr; nc += dc;
      }
    }
  };

  switch (piece.type) {
    case "P": {
      const dir = piece.color === "w" ? -1 : 1;
      const startRow = piece.color === "w" ? 6 : 1;
      if (!opts.forAttack) {
        if (inBounds(r + dir, c) && !board[r + dir][c]) {
          moves.push({ r: r + dir, c });
          if (r === startRow && !board[r + 2 * dir][c]) {
            moves.push({ r: r + 2 * dir, c });
          }
        }
      }
      for (const dc of [-1, 1]) {
        const nr = r + dir, nc = c + dc;
        if (inBounds(nr, nc)) {
          const target = board[nr][nc];
          if (opts.forAttack) {
            moves.push({ r: nr, c: nc });
          } else if (target && target.color !== piece.color) {
            moves.push({ r: nr, c: nc });
          }
        }
      }
      break;
    }
    case "N": {
      const jumps = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1],
      ];
      for (const [dr, dc] of jumps) push(r + dr, c + dc);
      break;
    }
    case "B":
      slide([[-1, -1], [-1, 1], [1, -1], [1, 1]]);
      break;
    case "R":
      slide([[-1, 0], [1, 0], [0, -1], [0, 1]]);
      break;
    case "Q":
      slide([[-1, -1], [-1, 1], [1, -1], [1, 1], [-1, 0], [1, 0], [0, -1], [0, 1]]);
      break;
    case "K": {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          push(r + dr, c + dc);
        }
      }
      break;
    }
    default:
      break;
  }
  return moves;
}

export function findKing(board, color) {
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const p = board[r][c];
      if (p && p.type === "K" && p.color === color) return { r, c };
    }
  }
  return null;
}

export function isSquareAttacked(board, r, c, byColor) {
  for (let rr = 0; rr < 8; rr++) {
    for (let cc = 0; cc < 8; cc++) {
      const p = board[rr][cc];
      if (p && p.color === byColor) {
        const attacks = getPieceMoves(board, rr, cc, { forAttack: true });
        if (attacks.some((m) => m.r === r && m.c === c)) return true;
      }
    }
  }
  return false;
}
