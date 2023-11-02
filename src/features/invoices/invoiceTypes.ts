// Type for an individual invoice
export interface InvoiceType {
  id: number;
  name: string; 
  amount: number;
  dueDate: Date;
  details: string;
  userId: number;
}

// Type for the state of the invoices feature in Redux store
export interface InvoiceState {
  data: InvoiceType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
