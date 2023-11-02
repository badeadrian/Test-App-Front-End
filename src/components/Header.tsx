// `Header.tsx`:
// -------------
// Header component showing the logout option if a user is authenticated.
import React from 'react';
import LogoutButton from './LogoutButton';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

 // Displays logout button based on authentication state.
const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <div>
      {isAuthenticated && <LogoutButton onLogout={onLogout} />}
    </div>
  );
};

export default Header;