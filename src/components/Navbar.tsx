import React from 'react';
import { AppBar, Toolbar, Button, IconButton } from '@mui/material';
import { Menu as MenuIcon, MenuOpen as MenuOpenIcon } from '@mui/icons-material';

// Prop types for the Navbar component
interface NavbarProps {
  onLogout: () => void;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

// The Navbar component
const Navbar: React.FC<NavbarProps> = ({ onLogout, isSidebarOpen, toggleSidebar }) => {
  return (
    <AppBar position="fixed">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton onClick={toggleSidebar}>
          {isSidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Button color="inherit" onClick={onLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}


export default Navbar;
