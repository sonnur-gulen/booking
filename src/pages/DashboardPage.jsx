import { Box, Container, Typography } from '@mui/material';
import ReservationCharts from '../Components/ReservationCharts';


const DashboardPage = () => {
  
  return (
    <Container maxWidth="xl"> 
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
          Check-in İstatistikleri
        </Typography>
        <ReservationCharts />
      </Box>
    </Container>
  );
};

export default DashboardPage;