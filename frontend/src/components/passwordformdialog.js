import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function PasswordFormDialog({
  isOpen,
  openModal,
  onChange,
  onClose,
  onSubmit,
  newRowData,
}) {

  return (
    <React.Fragment>
      <Button className="!ml-4" variant="outlined" onClick={openModal}>
        Add Password
      </Button>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle className="dialog-content">Add Password</DialogTitle>
        <DialogContent className="dialog-content">
          <DialogContentText className="dialog-content">
            Please enter the name (e.g. 'Work' or 'Netflix'), account, and the password.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name-controlled"
            name="name"
            label="Name"
            fullWidth
            variant="standard"
            value={newRowData.name || ""}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="account-controlled"
            name="account"
            label="Account"
            fullWidth
            variant="standard"
            value={newRowData.account || ""}
            onChange={onChange}
          />
          <TextField
            autoFocus
            margin="dense"
            id="key-controlled"
            name="key"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
            value={newRowData.key || ""}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
