import React, { ReactNode, useState } from 'react';
import { Drawer, CssBaseline, Box, IconButton, useMediaQuery, Theme } from '@mui/material';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { MenuOpen, Menu } from '@mui/icons-material';

// Interface for the props of DashboardLayout component
interface DashboardLayoutProps {
  children: ReactNode;
  onLogout: () => void;
}

const drawerWidth = 240;

// Functional component for the dashboard layout
const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Hook to determine if the viewport is mobile size or smaller
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Navbar
        onLogout={onLogout}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <Drawer
        variant="permanent"
        open={isSidebarOpen}
        sx={{
          width: isSidebarOpen ? drawerWidth : (isMobile ? 0 : drawerWidth),
          flexShrink: 0,
          overflow: 'hidden',
          transition: 'width 0.3s ease',
          '& .MuiDrawer-paper': {
            width: isSidebarOpen ? drawerWidth : (isMobile ? 0 : drawerWidth),
            boxSizing: 'border-box',
            overflow: 'hidden',
            transition: 'width 0.3s ease',
          },
        }}
      >
        {isMobile && (
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 1, backgroundColor: '#f3f2fe' }}>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <MenuOpen /> : <Menu />}
            </IconButton>
          </Box>
        )}
        <Sidebar />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 20 }}>
        {children}
      </Box>
    </Box>
  );
}

export default DashboardLayout;
