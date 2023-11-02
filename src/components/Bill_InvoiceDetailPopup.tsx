// `Bill_InvoiceDetailPopup.tsx`:
// ------------------------------
// Component responsible for displaying detailed information of a bill or invoice in a popup.
import React, { useEffect, useRef } from 'react';
import { InvoiceType } from '../features/invoices/invoiceTypes';
import { BillType } from '../features/bills/billsType';
import { styled } from '@mui/system';

 // ... Styles for the popup modal.
const ModalContainer = styled('div')(({ theme }) => ({
  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: 'white',
  padding: '20px',
  width: '30%',       
  maxHeight: '90vh', 
  overflowY: 'auto', 
  zIndex: 10000,
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    top: '10%',
    left: '5%',
    transform: 'none',
  }
}));

 // ... Styles for the item details inside the popup.
const ItemDetails = styled('div')({
  padding: '2px',
});


interface PopupProps {
  item: InvoiceType | BillType;
  itemType: string;
  onClose: () => void;
  style?: React.CSSProperties;
}

  //  Modal logic for displaying and hiding.
  //  Handling of user interactions.
  //  Rendering the content.
const Bill_InvoiceDetailPopup: React.FC<PopupProps> = ({ item, itemType, onClose }) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <ModalContainer className="modal" ref={modalRef}>
      <ItemDetails className="item-details">
        <h2>{itemType === 'Invoice' ? 'Invoice' : 'Bill'} Details</h2>
        <p><strong>Details</strong> {item.details}</p>
        <p><strong>Amount:</strong> {item.amount}</p>
        <p><strong>Due Date:</strong> {new Date(item.dueDate).toLocaleDateString()}</p>
      </ItemDetails>
      <button onClick={onClose}>Close</button>
    </ModalContainer>
  );
};

export default Bill_InvoiceDetailPopup;
