import { logout } from '../services/apiService';
import { useNavigate } from "react-router-dom";
import { RESET_STATE } from '../store/constants';
import { useDispatch } from 'react-redux';

// Prop types for the Logout button component
interface LogoutButtonProps {
  onLogout?: () => void;
}
const dispatch = useDispatch();

// The LogoutButton component
const LogoutButton: React.FC<LogoutButtonProps> = ({ onLogout }) => {
  const navigate = useNavigate();

 // Handles the logout logic
  const handleLogout = () => {
    logout();
    console.log("Logged out successfully!");
    
    if (onLogout) {
      onLogout();
    }
    dispatch({ type: RESET_STATE });
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;