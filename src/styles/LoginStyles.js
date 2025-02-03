import { styled } from '@mui/material/styles';


const loginStyles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%' // Ensure it's taking up the full width
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 3,
    backgroundColor: 'white',
    borderRadius: 2,
    boxShadow: 3,
    width: '100%',
    maxWidth: '400px' // Optional: set max width for the form
  },
  form: {
    mt: 1,
    width: '100%'
  },
  button: {
    mt: 3,
    mb: 2
  }
  
};

export default loginStyles