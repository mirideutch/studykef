// import * as React from 'react';
import React, {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function AlertDialog(props) {
  
    const {open ,setOpen ,status ,label} = props
    const [openb, setOpenb] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (status==2){
      setOpenb(true)
    }
  };
  const handleCloseb = () => {
    setOpenb(false);
  };

  return (
    <div>
      
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"studyכיף"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {status > 0 ? ":) סימת בהצלחה " : "חבל, נסה שנית" }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>סגור</Button>
          
           
        </DialogActions>
      </Dialog>

      <Dialog
        open={openb}
        onClose={handleCloseb}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"studyכיף"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {"your mark is:" }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseb}>סגור</Button>
          
           
        </DialogActions>
      </Dialog>
    </div>
  );
}
