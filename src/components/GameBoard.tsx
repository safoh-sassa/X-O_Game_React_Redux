import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { makeMove } from "../store/gameSlice";
import styled from "@emotion/styled";

const BoardContainer = styled.div<{ $gridSize: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.$gridSize}, 1fr);
  gap: 5px;
`;

const CellButton = styled.button<{
  $isWinningCell?: boolean;
  $hasWinner: boolean;
}>`
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  background-color: ${(props) =>
    props.$isWinningCell ? "lightGreen" : "white"};
  border: 2px solid #1876d2;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: ${(props) =>
      !props.$isWinningCell && !props.$hasWinner ? "#1876d2" : undefined};
  }
`;

const GameBoard: React.FC = () => {
  const dispatch = useDispatch();

  const { board, boardSize, winner, winningCells } = useSelector(
    (state: RootState) => state.game
  );

  // Play win sound when a winner is declared
  useEffect(() => {
    if (winner) {
      const winSound = new Audio("/win-sound.wav"); // Path to sound file
      winSound.play();
    }
  }, [winner]);

  // Check if a cell is part of the winning line
  const isWinningCell = (row: number, col: number): boolean => {
    return winningCells.some((cell) => cell.row === row && cell.col === col);
  };

  // Handle cell click to dispatch an action
  const handleCellClick = (row: number, col: number): void => {
    if (!winner) {
      dispatch(makeMove({ row, col }));
    }
  };

  return (
    <BoardContainer $gridSize={boardSize}>
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <CellButton
            key={`${rowIndex}-${colIndex}`}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            $isWinningCell={isWinningCell(rowIndex, colIndex)}
            $hasWinner={!!winner}
          >
            {cell}
          </CellButton>
        ))
      )}
    </BoardContainer>
  );
};

export default GameBoard;
