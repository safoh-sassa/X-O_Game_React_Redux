import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./store";
import { startGame, restartGame } from "./store/gameSlice";
import { Button, Container, Typography, Box } from "@mui/material";
import SettingsPanel from "./components/SettingsPanel";
import GameBoard from "./components/GameBoard";
import AboutModal from "./components/AboutModal";
import styled from "@emotion/styled";

const AppContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const App: React.FC = () => {
  const dispatch = useDispatch();

  // Extract the necessary state from Redux
  const { gameStarted, winner, currentTurn } = useSelector(
    (state: RootState) => state.game
  );

  // State for controlling the AboutModal visibility
  const [openAboutModal, setOpenAboutModal] = useState<boolean>(false);

  const handleStart = (): void => {
    dispatch(startGame());
  };

  const handleRestart = (): void => {
    dispatch(restartGame());
  };

  const handleOpenAboutModal = (): void => {
    setOpenAboutModal(true);
  };

  const handleCloseAboutModal = (): void => {
    setOpenAboutModal(false);
  };

  return (
    <AppContainer>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: "bold",
          marginBottom: "30px",
          color: "#1876d2",
        }}
      >
        XO Game
      </Typography>

      {!gameStarted && (
        <>
          <SettingsPanel />
          <Box display="flex" flexDirection="row" gap={2} sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" onClick={handleStart}>
              Start Game
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleOpenAboutModal}
            >
              About
            </Button>
          </Box>
        </>
      )}

      {gameStarted && (
        <>
          <Typography variant="h5" gutterBottom>
            {winner
              ? winner === "draw"
                ? "It's a draw!"
                : `Winner: ${winner}`
              : `Current Turn: ${currentTurn}`}
          </Typography>
          <GameBoard />
          <Button
            variant="contained"
            color="primary"
            onClick={handleRestart}
            sx={{
              marginTop: 2,
              "&:hover": {
                backgroundColor: "darkblue",
              },
            }}
          >
            Restart Game
          </Button>
        </>
      )}

      <AboutModal open={openAboutModal} onClose={handleCloseAboutModal} />
    </AppContainer>
  );
};

export default App;
