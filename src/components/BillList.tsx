// `BillList.tsx`:
// ---------------
// Component that lists all bills.
import { RootState } from '../store/store';
import useFetchList from '../services/useFetchList';
import ListComponent from './ListComponent';
import { fetchBills } from '../features/bills/billsApi';

// Fetches the list of bills and handles loading and error states.
// Renders the bills.
const BillList = () => {
    const { listData, status, error } = useFetchList(fetchBills, (state: RootState) => state.bills);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return <ListComponent data={listData} itemType="Bill" />;
};

export default BillList;