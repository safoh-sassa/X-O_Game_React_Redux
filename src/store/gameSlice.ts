import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import checkWin from "../utils/checkWin";

export interface GameState {
  board: string[][];
  boardSize: number;
  winningLineLength: number;
  currentTurn: "X" | "O";
  gameStarted: boolean;
  winner: "X" | "O" | "draw" | null;
  winningCells: { row: number; col: number }[];
}

const initialState: GameState = {
  boardSize: 3,
  winningLineLength: 3,
  board: Array.from({ length: 3 }, () => Array(3).fill("")),
  currentTurn: "X",
  gameStarted: false,
  winner: null,
  winningCells: [],
};

const createEmptyBoard = (size: number): string[][] =>
  Array.from({ length: size }, () => Array(size).fill(""));

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setBoardSize(state, action: PayloadAction<number>) {
      const newSize = action.payload;
      state.boardSize = newSize;
      if (state.winningLineLength > newSize) {
        state.winningLineLength = newSize;
      }
      state.board = createEmptyBoard(newSize);
    },
    setWinningLineLength(state, action: PayloadAction<number>) {
      if (action.payload <= state.boardSize) {
        state.winningLineLength = action.payload;
      }
    },
    startGame(state) {
      state.gameStarted = true;
      state.board = createEmptyBoard(state.boardSize);
      state.currentTurn = "X";
      state.winner = null;
    },
    restartGame(state) {
      state.board = createEmptyBoard(state.boardSize);
      state.currentTurn = "X";
      state.winner = null;
      state.gameStarted = false;
      state.winningCells = [];
    },
    makeMove(state, action: PayloadAction<{ row: number; col: number }>) {
      const { row, col } = action.payload;
      if (state.board[row][col] !== "" || state.winner) return;

      state.board[row][col] = state.currentTurn;

      // Use checkWin function to determine the game state
      const result = checkWin(
        state.board,
        row,
        col,
        state.currentTurn,
        state.winningLineLength
      );

      if (result.isWin) {
        state.winner = state.currentTurn;
        state.winningCells = result.cells;
      } else {
        const isDraw = state.board.every((r) => r.every((cell) => cell !== ""));
        if (isDraw) {
          state.winner = "draw";
        }
      }

      if (!state.winner) {
        state.currentTurn = state.currentTurn === "X" ? "O" : "X";
      }
    },
  },
});

export const {
  setBoardSize,
  setWinningLineLength,
  startGame,
  restartGame,
  makeMove,
} = gameSlice.actions;

export default gameSlice.reducer;
