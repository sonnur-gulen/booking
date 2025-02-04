import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';

export const useReservationData = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  
  const fetchReservations = useCallback(async () => {
    
    setLoading(true);
    setProgress(0);

    try {
      
      const savedData = localStorage.getItem('reservationData');
      if (savedData) {
        const { timestamp, data } = JSON.parse(savedData);
       
        if (Date.now() - timestamp < 3600000) { 
          setReservations(data);
          setLoading(false);
          return;
        }
      }

      
      const response = await fetch('/api/booking');
      const bookings = await response.json();

      
      const limitedBookings = bookings.slice(0, 500);
      let allReservations = [];

      
      for (let i = 0; i < limitedBookings.length; i += 50) {
       
        const currentBookings = limitedBookings.slice(i, i + 50);
        
        const detailPromises = currentBookings.map(async (booking) => {
          try {
            const detailResponse = await fetch(`/api/booking/${booking.bookingid}`);
            if (detailResponse.ok) {
              const detail = await detailResponse.json();
              return { ...detail, id: booking.bookingid };
            }
            return null;
          } catch (error) {
            console.log(`Hata: ${booking.bookingid} ID'li kayıt alınamadı`);
            return null;
          }
        });

       
        const details = await Promise.all(detailPromises);
        
    
        allReservations = [...allReservations, ...details.filter(d => d !== null)];

   
        setProgress((i + 50) / limitedBookings.length * 100);

        if (i + 50 < limitedBookings.length) {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }

      localStorage.setItem('reservationData', JSON.stringify({
        timestamp: Date.now(),
        data: allReservations
      }));

      setReservations(allReservations);
      toast.success('Veriler başarıyla yüklendi');

    } catch (error) {
      console.log('Veri çekme hatası:', error);
      toast.error('Veriler yüklenemedi!');
      setReservations([]);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  }, []);

  const refreshReservations = useCallback(() => {
    localStorage.removeItem('reservationData');
    fetchReservations();
  }, [fetchReservations]);

  return {
    reservations,    
    loading,         
    progress,        
    fetchReservations,    
    refreshReservations,  
    setReservations      
  };
};