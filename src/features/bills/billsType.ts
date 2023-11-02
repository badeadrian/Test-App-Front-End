// Type definition for a bill
export interface BillType {
  id: number;
  name: string;
  amount: number;
  dueDate: Date;
  details: string;
  userId: number;
}

// State type definition for the bills slice
export interface BillState {
  data: BillType[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}
