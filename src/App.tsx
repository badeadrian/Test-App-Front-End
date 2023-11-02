import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import InvoiceList from './components/InvoiceList';
import BillList from './components/BillList';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import { initializeAuth, logout } from './services/apiService';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';

const App: React.FC = () => {
    // State to track if the user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

   // Hook to check if the user is authenticated on component mount
  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      setIsAuthenticated(true);
      initializeAuth();
    }
  }, []);

   // Callback to set authenticated state on successful login
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

   // Callback to handle user logout
  const handleLogout = () => {
    logout();
    setIsAuthenticated(false); 
  };

  // If the user is not authenticated, show login and register routes
  if (!isAuthenticated) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Router>
            <Routes>
              <Route path="/login" element={<LoginComponent onLoginSuccess={handleLoginSuccess} />} />
              <Route path="/register" element={<RegisterComponent />} />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </Provider>
    );
  }

   // If the user is authenticated, show the main app routes (dashboard, invoices, bills)
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/invoices" element={
              <DashboardLayout onLogout={handleLogout}>
                <InvoiceList />
              </DashboardLayout>
            } />
            <Route path="/bills" element={
              <DashboardLayout onLogout={handleLogout}>
                <BillList />
              </DashboardLayout>
            } />
            <Route path="/" element={
              <DashboardLayout onLogout={handleLogout}>
                <InvoiceList />
              </DashboardLayout>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
