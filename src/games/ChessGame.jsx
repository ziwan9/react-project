import React, { useState, useCallback, useMemo } from "react";
import GameHeader from "../components/shared/GameHeader.jsx";
import ScoreChip from "../components/shared/ScoreChip.jsx";
import {
  PIECE_UNICODE,
  createInitialBoard,
  getPieceMoves,
  findKing,
  isSquareAttacked,
} from "./chessLogic.js";
import "../components/shared/shared.css";
import "./ChessGame.css";

// Simplified but functional: legal-looking moves per piece type, turn order,
// captures, check indicator, auto-queen promotion. No castling / en passant /
// pin enforcement — kept intentionally simple for a school project.
export default function ChessGame() {
  const [board, setBoard] = useState(createInitialBoard);
  const [selected, setSelected] = useState(null); // {r,c}
  const [turn, setTurn] = useState("w");
  const [captured, setCaptured] = useState({ w: [], b: [] });
  const [message, setMessage] = useState("White to move");

  const legalMoves = useMemo(() => {
    if (!selected) return [];
    return getPieceMoves(board, selected.r, selected.c);
  }, [selected, board]);

  const resetChess = useCallback(() => {
    setBoard(createInitialBoard());
    setSelected(null);
    setTurn("w");
    setCaptured({ w: [], b: [] });
    setMessage("White to move");
  }, []);

  const handleSquareClick = (r, c) => {
    const piece = board[r][c];

    if (selected) {
      const isLegal = legalMoves.some((m) => m.r === r && m.c === c);
      if (isLegal) {
        const newBoard = board.map((row) => row.slice());
        const moving = newBoard[selected.r][selected.c];
        const capturedPiece = newBoard[r][c];

        if (capturedPiece) {
          setCaptured((prev) => ({
            ...prev,
            [capturedPiece.color]: [...prev[capturedPiece.color], capturedPiece.type],
          }));
        }

        if (moving.type === "P" && (r === 0 || r === 7)) {
          newBoard[r][c] = { type: "Q", color: moving.color };
        } else {
          newBoard[r][c] = moving;
        }
        newBoard[selected.r][selected.c] = null;

        const nextTurn = turn === "w" ? "b" : "w";
        const opponentKing = findKing(newBoard, nextTurn);
        const inCheck = opponentKing
          ? isSquareAttacked(newBoard, opponentKing.r, opponentKing.c, turn)
          : false;

        setBoard(newBoard);
        setSelected(null);
        setTurn(nextTurn);
        setMessage(
          inCheck
            ? `${nextTurn === "w" ? "White" : "Black"} is in check!`
            : `${nextTurn === "w" ? "White" : "Black"} to move`
        );
        return;
      }
      if (piece && piece.color === turn) {
        setSelected({ r, c });
      } else {
        setSelected(null);
      }
      return;
    }

    if (piece && piece.color === turn) {
      setSelected({ r, c });
    }
  };

  return (
    <div>
      <GameHeader title="Chess" subtitle="Click a piece, then click a highlighted square to move." />

      <div className="score-row">
        <ScoreChip label="Turn" value={turn === "w" ? "White" : "Black"} />
        <ScoreChip label="White captured" value={captured.b.length} />
        <ScoreChip label="Black captured" value={captured.w.length} />
      </div>

      <div className={`chess-message ${message.includes("check") ? "chess-message--check" : ""}`}>
        {message}
      </div>

      <div className="chess-layout">
        <div className="chess-board">
          {board.map((row, r) =>
            row.map((piece, c) => {
              const isDark = (r + c) % 2 === 1;
              const isSelected = selected && selected.r === r && selected.c === c;
              const isLegal = legalMoves.some((m) => m.r === r && m.c === c);
              return (
                <div
                  key={`${r}-${c}`}
                  onClick={() => handleSquareClick(r, c)}
                  className={`chess-square ${isDark ? "chess-square--dark" : "chess-square--light"} ${
                    isSelected ? "chess-square--selected" : ""
                  }`}
                >
                  {isLegal && (
                    <div className={`chess-hint ${piece ? "chess-hint--capture" : "chess-hint--move"}`} />
                  )}
                  {piece && (
                    <span className={`chess-piece chess-piece--${piece.color}`}>
                      {PIECE_UNICODE[`${piece.color}${piece.type}`]}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="chess-captured">
          <div className="chess-captured-label">CAPTURED</div>
          <div className="chess-captured-group">
            <div className="chess-captured-group-label">By White</div>
            <div className="chess-captured-icons">
              {captured.b.map((t, i) => (
                <span key={i}>{PIECE_UNICODE[`b${t}`]}</span>
              ))}
            </div>
          </div>
          <div className="chess-captured-group">
            <div className="chess-captured-group-label">By Black</div>
            <div className="chess-captured-icons">
              {captured.w.map((t, i) => (
                <span key={i}>{PIECE_UNICODE[`w${t}`]}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <button onClick={resetChess} className="btn-primary chess-reset">
        RESET BOARD
      </button>
    </div>
  );
}
