import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Divider,
  Box
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Navbar = ({ onMenuClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
    navigate('/');
  };

  const handleProfile = () => {
    handleClose();
   
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ 
            transform: 'scale(1.5)',  
            marginLeft: '10px'        
          }}
          onClick={onMenuClick}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Booking Dashboard
        </Typography>

        <Box>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
            sx={{ 
              transform: 'scale(1.5)',  
              marginLeft: '10px'        
            }}
          
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            sx={{
              '& .MuiPaper-root': {  
                minWidth: '200px',    
                mt: 1.5,             
              },
              '& .MuiMenuItem-root': {  
                padding: '12px 24px',   
                fontSize: '16px',       
              },
              '& .MuiSvgIcon-root': {   
                fontSize: '24px',       
                marginRight: '12px'     
              }
            }}
          >
            <MenuItem onClick={handleProfile}>
              <PersonIcon sx={{ mr: 1 }} />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <LogoutIcon sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  onMenuClick: PropTypes.func.isRequired
};

export default Navbar;