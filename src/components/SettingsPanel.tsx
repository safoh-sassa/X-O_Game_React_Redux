import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setBoardSize, setWinningLineLength } from "../store/gameSlice";
import { Box } from "@mui/material";
import styled from "@emotion/styled";

const StyledTypography = styled.div`
  font-weight: bold;
  color: #000;
`;

const StyledButton = styled.button`
  border: 2px solid #1876d2;
  font-size: 1.2rem;
  font-weight: bold;

  cursor: pointer;
  background-color: transparent;
  width: 33px;
  height: 33px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #1876d2;
    color: #fff;
  }
`;

const StyledButtonGroup = styled.div`
  display: flex;
  & button:nth-of-type(2) {
    margin-left: 3px;
  }
`;

const SettingsPanel: React.FC = () => {
  const dispatch = useDispatch();

  const { boardSize, winningLineLength } = useSelector(
    (state: RootState) => state.game
  );

  // calculate the maximum board size based on screen size
  const calculateMaxBoardSize = (): number => {
    const cellSize = 50; // 50px for each cell
    const maxWidth = Math.floor(window.innerWidth / (cellSize * 1.6)); // Maximum columns
    const maxHeight = Math.floor(window.innerHeight / (cellSize * 1.6)); // Maximum rows
    return Math.min(maxWidth, maxHeight); // Return smaller value for square board
  };

  const handleIncreaseBoard = (): void => {
    const maxBoardSize = calculateMaxBoardSize();
    if (boardSize < maxBoardSize) {
      dispatch(setBoardSize(boardSize + 1));
    }
  };

  const handleDecreaseBoard = (): void => {
    if (boardSize > 3) {
      dispatch(setBoardSize(boardSize - 1));
    }
  };

  const handleIncreaseWinLength = (): void => {
    if (winningLineLength < boardSize) {
      dispatch(setWinningLineLength(winningLineLength + 1));
    }
  };

  const handleDecreaseWinLength = (): void => {
    if (winningLineLength > 3) {
      dispatch(setWinningLineLength(winningLineLength - 1));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      mb={2}
    >
      {/* Row 1: Board Size */}
      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        <StyledTypography>{`Board Size: ${boardSize} x ${boardSize}`}</StyledTypography>
        <StyledButtonGroup>
          <StyledButton onClick={handleDecreaseBoard}>-</StyledButton>
          <StyledButton onClick={handleIncreaseBoard}>+</StyledButton>
        </StyledButtonGroup>
      </Box>

      {/* Row 2: Winning Line Length */}
      <Box display="flex" flexDirection="row" alignItems="center" gap={1}>
        <StyledTypography>{`Winning Line Length: ${winningLineLength}`}</StyledTypography>
        <StyledButtonGroup>
          <StyledButton onClick={handleDecreaseWinLength}>-</StyledButton>
          <StyledButton onClick={handleIncreaseWinLength}>+</StyledButton>
        </StyledButtonGroup>
      </Box>
    </Box>
  );
};

export default SettingsPanel;
