import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchInvoices } from './invoicesApi';
import { InvoiceState, InvoiceType } from './invoiceTypes';

// Initial state for the invoices slice
const initialState: InvoiceState = {
  data: [],
  status: 'idle',
  error: null
};

// Slice for invoices which includes reducers to manage state

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
        .addCase(fetchInvoices.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchInvoices.fulfilled, (state, action: PayloadAction<InvoiceType[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchInvoices.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || "An unknown error occurred";
        });
    } 
  });

export default invoiceSlice.reducer;