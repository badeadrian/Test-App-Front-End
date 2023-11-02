import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/apiService';
import { AxiosError } from 'axios';

// Interface for error response
interface ErrorResponse {
    message?: string;
}

// Async thunk to fetch bills from the API
export const fetchBills = createAsyncThunk(
    'bills/fetchBills',
    async () => {
        try {
            const response = await api.get('/bills');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            throw new Error((axiosError.response?.data as ErrorResponse)?.message || 'Failed to fetch bills');
        }
    }
);