import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchBills} from './billsApi';
import { BillState, BillType } from './billsType';

// Initial state for the bills slice
const initialState: BillState = {
  data: [],
  status: 'idle',
  error: null
};

// Redux slice for bills
const billSlice = createSlice({
    name: 'bills',
    initialState,
    reducers: {},
    extraReducers: builder => {
      builder
          // Handle pending state when fetching bills
        .addCase(fetchBills.pending, (state) => {
          state.status = 'loading';
        })
          // Handle fulfilled state when fetching bills
        .addCase(fetchBills.fulfilled, (state, action: PayloadAction<BillType[]>) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
           // Handle rejected state when fetching bills
        .addCase(fetchBills.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message || "An unknown error occurred";
        });
    } 
  });

export default billSlice.reducer;
