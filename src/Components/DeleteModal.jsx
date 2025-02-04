import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material';

 const DeleteModal = ({ open, handleClose, handleDelete, loading }) => (
  <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Rezervasyon Silme</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Bu rezervasyonu silmek istediğinizden emin misiniz?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="inherit">İptal</Button>
      <Button 
        onClick={handleDelete} 
        color="error" 
        variant="contained"
        disabled={loading}
      >
        {loading ? 'Siliniyor...' : 'Sil'}
      </Button>
    </DialogActions>
  </Dialog>
);
export default DeleteModal