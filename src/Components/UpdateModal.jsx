import React, { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button
} from '@mui/material';

const initialFormState = {
  firstname: '',
  lastname: '',
  totalprice: '',
  depositpaid: true,
  bookingdates: {
    checkin: '',
    checkout: ''
  },
  additionalneeds: ''
};

 const UpdateModal = ({ open, handleClose, reservation, handleUpdate, loading }) => {
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    if (reservation) {
      setFormData({
        ...reservation,
        bookingdates: {
          checkin: reservation.bookingdates?.checkin || '',
          checkout: reservation.bookingdates?.checkout || ''
        }
      });
    }
  }, [reservation]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      if (name === 'checkin' || name === 'checkout') {
        return {
          ...prev,
          bookingdates: {
            ...prev.bookingdates,
            [name]: value
          }
        };
      }
      return { ...prev, [name]: value };
    });
  }, []);

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h2" mb={2}>
          Rezervasyon Güncelle
        </Typography>
        {['firstname', 'lastname'].map(field => (
          <TextField
            key={field}
            fullWidth
            label={field === 'firstname' ? 'İsim' : 'Soyisim'}
            name={field}
            value={formData[field]}
            onChange={handleChange}
            margin="normal"
          />
        ))}
        {['checkin', 'checkout'].map(field => (
          <TextField
            key={field}
            fullWidth
            label={field === 'checkin' ? 'Check-in Tarihi' : 'Check-out Tarihi'}
            name={field}
            type="date"
            value={formData.bookingdates[field]}
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
        ))}
        <TextField
          fullWidth
          label="Toplam Ücret"
          name="totalprice"
          type="number"
          value={formData.totalprice}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Notlar"
          name="additionalneeds"
          value={formData.additionalneeds}
          onChange={handleChange}
          margin="normal"
          multiline
          rows={4}
        />
        <Box mt={2} display="flex" justifyContent="flex-end" gap={1}>
          <Button onClick={handleClose} color="inherit">İptal</Button>
          <Button 
            onClick={() => handleUpdate(formData)} 
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Güncelleniyor...' : 'Güncelle'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default UpdateModal