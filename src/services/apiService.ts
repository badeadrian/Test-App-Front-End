import axios from 'axios';
import { store } from '../store/store';
import { RESET_STATE } from '../store/constants';

const baseURL = "http://localhost:3000";
const api = axios.create({
  baseURL: baseURL
});

export async function register(name: string, email: string, password: string): Promise<boolean> {
  try {
    const response = await api.post('/auth/register', { name, email, password });
    
    if (response.status === 201) {// HTTP status 201 indicates resource was successfully created
      return true; 
    } else {
      return false; 
    }

  } catch (error) {
    console.error('Failed to register:', error);
    return false;
  }
}

// Function to authenticate a user and retrieve a token
export async function login(email: string, password: string): Promise<string | null> {
  try {
    const response = await api.post('/auth/login', { email, password });
    const token = response.data.access_token;

    // Save the token to axios headers for future requests.
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    // Store the token in localStorage or sessionStorage for persistence.  TODO // CHANGE TO COOKIES!!
    localStorage.setItem('jwt', token);
    return token;

  } catch (error) {
    console.error('Failed to login:', error);
    return null;
  }
}

// Function to log out a user
export function logout() {
  // Remove the token from axios headers.
  delete api.defaults.headers.common['Authorization'];

  // Clear the token from storage.
  localStorage.removeItem('jwt');
  store.dispatch({ type: RESET_STATE });
}

// Initialize authentication by setting up axios with a saved token, if one exists
export function setupAxiosWithToken(token: string): void {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('jwt', token);
}

export function initializeAuth() {
  const savedToken = localStorage.getItem('jwt');
  if (savedToken) {
    setupAxiosWithToken(savedToken);
  }
}

export default api;