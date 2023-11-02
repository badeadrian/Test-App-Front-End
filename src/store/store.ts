import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from '../features/invoices/invoiceSlice';
import billReducer from '../features/bills/billsSlice';
import { RESET_STATE } from './constants';
import { AnyAction, combineReducers } from 'redux';

// Combine multiple reducers into a single reducer function.
const combinedReducer = combineReducers({
  invoices: invoiceReducer,
  bills: billReducer,
});

// Define RootState type to represent the shape of the entire state.
export type RootState = ReturnType<typeof combinedReducer>;

// Custom root reducer which allows for the state to be reset.
//  state - The current state or undefined.
// action - The dispatched action.
//  {RootState} - The new state.
const rootReducer: (state: RootState | undefined, action: AnyAction) => RootState = (state, action) => {
   // If action is RESET_STATE, reset the entire state to its initial value.
  if (action.type === RESET_STATE) {
    console.log('YES ');
    state = undefined;
  }

  // Delegate to the combined reducer to handle the actual logic.
  return combinedReducer(state, action);
};

// Configure and create the Redux store with the custom root reducer.
export const store = configureStore({
  reducer: rootReducer,
});

// Define AppDispatch type to represent the dispatch function from the store.
type AppDispatch = typeof store.dispatch;
export type { AppDispatch };
