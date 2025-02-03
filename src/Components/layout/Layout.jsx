import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './SideBar';

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={handleSidebarOpen} />
      <Sidebar
        open={isSidebarOpen}
        onClose={handleSidebarClose}
      />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          mt: 8,
          width: '100%'
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;