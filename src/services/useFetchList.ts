import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';


// Custom hook to fetch list data using Redux.
// fetchAction - The Redux action to dispatch for fetching data.
// selector - The selector function to select a slice of state from the Redux store.
const useFetchList = (fetchAction: any, selector: (state: RootState) => any) => {
   // Get Redux dispatch function.
  const dispatch: AppDispatch = useDispatch();

   // Get a slice of state using the selector function.
  const stateSlice = useSelector(selector);

// Extract data, status, and error from the selected state slice.
  const listData = stateSlice.data; 
  const status: Status = stateSlice.status;
  const error: string | null = stateSlice.error;

   // useEffect hook to perform side effect: dispatch fetch action if status is 'idle'.
  useEffect(() => {
    console.log("Current status:", status);
    if (status === 'idle') {
      console.log("Dispatching fetch action");
      dispatch(fetchAction());
    }
  }, [status, dispatch, fetchAction]);

  return { listData, status, error };
};
export default useFetchList;