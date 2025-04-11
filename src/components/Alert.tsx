import React from "react";
import { Alert as MuiAlert } from "@mui/material";

interface AlertProps {
  message: string;
  severity?: "error" | "warning" | "info" | "success";
}

const Alert: React.FC<AlertProps> = ({ message, severity = "warning" }) => {
  return (
    <MuiAlert severity={severity} style={{ marginBottom: "10px" }}>
      {message}
    </MuiAlert>
  );
};

export default Alert;
