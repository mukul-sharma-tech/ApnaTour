import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button,
  Box
} from '@mui/material';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 'md',
  fullWidth = true,
  showCloseButton = true
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      PaperProps={{
        sx: {
          borderRadius: 2,
          p: 1
        }
      }}
    >
      {title && (
        <DialogTitle sx={{ 
          bgcolor: 'success.main', 
          color: 'white',
          py: 2
        }}>
          {title}
        </DialogTitle>
      )}
      
      <DialogContent dividers sx={{ py: 3 }}>
        {children}
      </DialogContent>
      
      {showCloseButton && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button 
            onClick={onClose} 
            
            variant="outlined"
            color="success"

            sx={{
              textTransform: 'none',
              px: 3
            }}
          >
            Close
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default Modal;