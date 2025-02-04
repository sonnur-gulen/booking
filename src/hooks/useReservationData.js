import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getLineColor } from '../utils/chartConfig';

const LOCAL_STORAGE_KEY = "bookingData";

const useReservationData = () => {
  const [lineChartData, setLineChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      const { lineChart, pieChart } = JSON.parse(storedData);
      setLineChartData(lineChart);
      setPieChartData(pieChart);
    }
  }, []);

  const { data: bookingIds, isLoading, error } = useQuery(
    ["bookingIds"],
    async () => {
      const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedData) return JSON.parse(storedData).bookingIds;

      const ids = await fetchBookingIds();
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ bookingIds: ids }));
      return ids;
    },
    {
      retry: 3,
      staleTime: 5 * 60 * 1000,
      cacheTime: 30 * 60 * 1000,
    }
  );
  useEffect(() => {
    const processData = async () => {
      if (!bookingIds?.length || lineChartData || pieChartData) return;

      setIsLoadingDetails(true);
      try {
        const MAX_REQUESTS = 50;  
        const batchedIds = bookingIds.slice(0, 250); 
        let allDetails = [];

        for (let i = 0; i < batchedIds.length; i += MAX_REQUESTS) {
          const batch = batchedIds.slice(i, i + MAX_REQUESTS);
          const results = await Promise.all(batch.map(item => fetchBookingDetails(item.bookingid)));
          allDetails.push(...results.filter(Boolean));
          await new Promise(resolve => setTimeout(resolve, 500)); 
        }

        if (!allDetails.length) {
          console.warn('Geçerli rezervasyon bulunamadı');
          return;
        }

        const checkinDates = allDetails
          .map(booking => booking.bookingdates?.checkin)
          .filter(Boolean)
          .map(date => new Date(date));

        const years = Array.from({ length: 11 }, (_, i) => 2014 + i);
        const monthNames = [
          "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
          "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
        ];

        const yearlyData = years.reduce((acc, year) => {
          acc[year] = new Array(12).fill(0);
          return acc;
        }, {});

        checkinDates.forEach(date => {
          const year = date.getFullYear();
          const month = date.getMonth();
          if (yearlyData[year]) {
            yearlyData[year][month]++;
          }
        });

        const newLineChartData = {
          labels: monthNames,
          datasets: years.map((year, index) => ({
            label: `${year}`,
            data: yearlyData[year],
            borderColor: getLineColor(index),
            backgroundColor: getLineColor(index, 0.2),
            tension: 0.4,
            fill: false
          }))
        };

        const yearTotals = years.reduce((acc, year) => {
          acc[year] = yearlyData[year].reduce((sum, count) => sum + count, 0);
          return acc;
        }, {});

        const totalCheckins = Object.values(yearTotals).reduce((sum, count) => sum + count, 0);

        const newPieChartData = {
          labels: years.map(year => 
            `${year} (${((yearTotals[year] / totalCheckins) * 100).toFixed(1)}%)`
          ),
          datasets: [{
            data: Object.values(yearTotals),
            backgroundColor: years.map((_, index) => getLineColor(index, 1)),
            hoverOffset: 4
          }]
        };

        setLineChartData(newLineChartData);
        setPieChartData(newPieChartData);

        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
          bookingIds,
          lineChart: newLineChartData,
          pieChart: newPieChartData
        }));

      } catch (error) {
        console.error("Veri İşleme Hatası:", error);
      } finally {
        setIsLoadingDetails(false);
      }
    };

    processData();
  }, [bookingIds]);

  return {
    lineChartData,
    pieChartData,
    isLoading: isLoading || isLoadingDetails,
    error
  };
};

export default useReservationData;
