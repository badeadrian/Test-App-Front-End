import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/apiService';
import { AxiosError } from 'axios';

// Type for API error response
interface ErrorResponse {
    message?: string;
}

// Asynchronous thunk to fetch invoices from the API
export const fetchInvoices = createAsyncThunk(
    'invoices/fetchInvoices',
    async () => {
        try {
            const response = await api.get('/invoices');
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError;
            throw new Error((axiosError.response?.data as ErrorResponse)?.message || 'Failed to fetch invoices');
        }
    }
);
