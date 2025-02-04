import React, { useState, useEffect } from 'react';
import {
  Paper, Box, CircularProgress, Typography,
  Button, TablePagination
} from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useReservationData } from '../hooks/reservationListData';
import ReservationTable from '../Components/ReservationTable';
import UpdateModal from '../Components/UpdateModal';
import DeleteModal from '../Components/DeleteModal';

const ReservationListPage = () => {
  const [page, setPage] = useState(0);
  const [secilenRezervasyon, setSecilenRezervasyon] = useState(null);
  const [modalDurumu, setModalDurumu] = useState({
    guncelle: false,
    sil: false
  });
  const [yukleniyor, setYukleniyor] = useState({
    guncelle: false,
    sil: false
  });

  const sayfaBasiKayit = 100;

  const { 
    reservations, 
    loading, 
    progress, 
    fetchReservations 
  } = useReservationData();

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  const guncelleModalAc = (rezervasyon) => {
    setSecilenRezervasyon(rezervasyon);
    setModalDurumu(onceki => ({ ...onceki, guncelle: true }));
  };

  const silModalAc = (rezervasyon) => {
    setSecilenRezervasyon(rezervasyon);
    setModalDurumu(onceki => ({ ...onceki, sil: true }));
  };

  const rezervasyonGuncelle = async (formVerisi) => {
    setYukleniyor(onceki => ({ ...onceki, guncelle: true }));
    try {
      const tokenYaniti = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          password: 'password123'
        })
      });

      const tokenBilgisi = await tokenYaniti.json();

      const guncelleYaniti = await fetch(`/api/booking/${secilenRezervasyon.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${tokenBilgisi.token}`,
          'Authorization': `Basic ${btoa('admin:password123')}`
        },
        credentials: 'include',
        body: JSON.stringify({
          firstname: formVerisi.firstname,
          lastname: formVerisi.lastname,
          totalprice: Number(formVerisi.totalprice),
          depositpaid: true,
          bookingdates: formVerisi.bookingdates,
          additionalneeds: formVerisi.additionalneeds
        })
      });

      if (guncelleYaniti.ok) {
        toast.success('Güncelleme başarılı!');
        setModalDurumu(onceki => ({ ...onceki, guncelle: false }));
        localStorage.removeItem('reservationData');
        await fetchReservations();
      } else {
        throw new Error('Güncelleme başarısız');
      }
    } catch (hata) {
      console.log('Güncelleme hatası:', hata);
      toast.error('Güncelleme yapılamadı!');
    } finally {
      setYukleniyor(onceki => ({ ...onceki, guncelle: false }));
    }
  };

  const rezervasyonSil = async () => {
    setYukleniyor(onceki => ({ ...onceki, sil: true }));
    try {
      const tokenYaniti = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'admin',
          password: 'password123'
        })
      });

      const tokenBilgisi = await tokenYaniti.json();

      const silmeYaniti = await fetch(`/api/booking/${secilenRezervasyon.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Cookie': `token=${tokenBilgisi.token}`,
          'Authorization': `Basic ${btoa('admin:password123')}`
        },
        credentials: 'include'
      });

      if (silmeYaniti.ok) {
        toast.success('Silme başarılı!');
        setModalDurumu(onceki => ({ ...onceki, sil: false }));
        localStorage.removeItem('reservationData');
        await fetchReservations();
      } else {
        throw new Error('Silme başarısız');
      }
    } catch (hata) {
      console.log('Silme hatası:', hata);
      toast.error('Silme işlemi yapılamadı!');
    } finally {
      setYukleniyor(onceki => ({ ...onceki, sil: false }));
    }
  };

  const guncelleModalKapat = () => {
    setModalDurumu(onceki => ({ ...onceki, guncelle: false }));
  };

  const silModalKapat = () => {
    setModalDurumu(onceki => ({ ...onceki, sil: false }));
  };

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box p={2} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Rezervasyon Listesi</Typography>
          <Button 
            variant="contained" 
            onClick={() => {
              localStorage.removeItem('reservationData');
              fetchReservations();
            }}
            disabled={loading}
          >
            Yenile
          </Button>
        </Box>

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" p={3}>
            <CircularProgress variant="determinate" value={progress} />
            <Typography variant="body2" color="textSecondary" mt={1}>
              {`${Math.round(progress)}% Yüklendi`}
            </Typography>
          </Box>
        ) : reservations.length === 0 ? (
          <Box display="flex" justifyContent="center" p={3}>
            <Typography color="error">
              Veri bulunamadı
            </Typography>
          </Box>
        ) : (
          <>
            <ReservationTable
              reservations={reservations}
              page={page}
              rowsPerPage={sayfaBasiKayit}
              onUpdateClick={guncelleModalAc}
              onDeleteClick={silModalAc}
            />
            <TablePagination
              component="div"
              count={reservations.length}
              page={page}
              onPageChange={(_, yeniSayfa) => setPage(yeniSayfa)}
              rowsPerPage={sayfaBasiKayit}
              rowsPerPageOptions={[100]}
              labelDisplayedRows={({ from, to, count }) => 
                `${from}-${to} / ${count} kayıt gösteriliyor`
              }
            />
          </>
        )}
      </Paper>

      <UpdateModal
        open={modalDurumu.guncelle}
        handleClose={guncelleModalKapat}
        reservation={secilenRezervasyon}
        handleUpdate={rezervasyonGuncelle}
        loading={yukleniyor.guncelle}
      />

      <DeleteModal
        open={modalDurumu.sil}
        handleClose={silModalKapat}
        handleDelete={rezervasyonSil}
        loading={yukleniyor.sil}
      />
    </>
  );
};

export default ReservationListPage;