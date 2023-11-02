// `InvoiceList.tsx`:
// ------------------
// Component that lists all invoices.
import { fetchInvoices } from '../features/invoices/invoicesApi';
import { RootState } from '../store/store';
import useFetchList from '../services/useFetchList';
import ListComponent from './ListComponent';

// Fetches the list of invoices and handles loading and error states.
// Renders the invoices.
const InvoiceList = () => {
    const { listData, status, error } = useFetchList(fetchInvoices, (state: RootState) => state.invoices);


    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return <ListComponent data={listData} itemType="Invoice" />;
};

export default InvoiceList;