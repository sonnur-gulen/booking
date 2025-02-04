import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button  // Button'ı import ettik
} from '@mui/material';

const ReservationTable = ({ reservations, page, rowsPerPage, onUpdateClick, onDeleteClick }) => (
  <TableContainer>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          {['ID', 'İsim', 'Soyisim', 'Check-in', 'Check-out', 'Toplam Ücret', 'Notlar', 'İşlemler']
            .map(header => (
              <TableCell key={header}>{header}</TableCell>
            ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {reservations
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map(reservation => (
            <TableRow key={reservation.id}>
              <TableCell>{reservation.id}</TableCell>
              <TableCell>{reservation.firstname}</TableCell>
              <TableCell>{reservation.lastname}</TableCell>
              <TableCell>{reservation.bookingdates?.checkin}</TableCell>
              <TableCell>{reservation.bookingdates?.checkout}</TableCell>
              <TableCell>{reservation.totalprice}</TableCell>
              <TableCell>{reservation.additionalneeds}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                  onClick={() => onUpdateClick(reservation)}
                >
                  Güncelle
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => onDeleteClick(reservation)}
                >
                  Sil
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default ReservationTable;