import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import useReservationData from "../hooks/useReservationData";
import { Line, Pie } from 'react-chartjs-2';

const ChartContainer = ({ children, title }) => (
  <Grid item xs={12} md={6}>
    <Box sx={{ 
      p: 2, 
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 2,
      height: '300px', 
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Typography variant="h6" gutterBottom sx={{ mb: 1 }}>{title}</Typography>
      <Box sx={{ flexGrow: 1, minHeight: 0 }}>
        {children}
      </Box>
    </Box>
  </Grid>
);

const ReservationCharts = () => {
  const { lineChartData, pieChartData, isLoading, error } = useReservationData();

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="300px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Error loading data: {error.message}
      </Typography>
    );
  }

  const chartOptions = {
    maintainAspectRatio: false, 
    responsive: true
  };

  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ 
        width: '100%', 
        p: 1, 
        height: 'auto'
      }}
    >
      <ChartContainer title="Aylık Check-in Dağılımı">
        {lineChartData ? (
          <Line 
            data={lineChartData} 
            options={chartOptions}
          />
        ) : (
          <Typography>Veri bulunamadı</Typography>
        )}
      </ChartContainer>
      
      <ChartContainer title="Yıllık Check-in Dağılımı">
        {pieChartData ? (
          <Pie 
            data={pieChartData} 
            options={chartOptions}
          />
        ) : (
          <Typography>Veri bulunamadı</Typography>
        )}
      </ChartContainer>
    </Grid>
  );
};

export default ReservationCharts;