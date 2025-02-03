import { styled } from '@mui/material/styles';

const NavigationStyles={
    selected:{
        borderBottom: '2px solid', 
        borderColor: 'primary.main', 
      
    },
    hover: {
        backgroundColor: 'primary.light',  // Background color on hover
        borderBottom: '2px solid',  // Optional: Add a border for hover effect
        borderColor: 'primary.dark',  // Border color on hover
        transition: 'background-color 0.3s ease', // Smooth transition
      }
}
 export default NavigationStyles