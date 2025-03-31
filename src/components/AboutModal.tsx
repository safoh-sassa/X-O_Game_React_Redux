import React from "react";
import { Modal, Typography, Button, Box } from "@mui/material";
import styled from "@emotion/styled";

const ModalContent = styled(Box)`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  text-align: justify;
  max-width: 350px;
  margin: 70px auto;
  margin-top: 80px;
`;

interface AboutModalProps {
  open: boolean; // Controls visibility of the modal
  onClose: () => void; // Callback function for closing the modal
}

const AboutModal: React.FC<AboutModalProps> = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: "bold" }}>
          About
        </Typography>
        <Typography>
          XO game Version 2 is created by Safoh Sassa on 28/3/2025 using
          React.js 19 with Vite, Typescript, MUI, Emotion, and Redux Toolkit.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onClose}
          sx={{ marginTop: 2 }}
        >
          Close
        </Button>
      </ModalContent>
    </Modal>
  );
};

export default AboutModal;
