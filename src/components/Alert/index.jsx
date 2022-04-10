import { Snackbar } from "@material-ui/core";
import { Alert as MuiAlert } from "@material-ui/lab";
import React from "react";
import { CryptoState } from "../../CryptoContext";

export const Alert = () => {
  const { alert, setAlert } = CryptoState();
  const handleClose = (_event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };
  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};
