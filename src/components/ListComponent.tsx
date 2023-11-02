// `ListComponent.tsx`:
// --------------------
// Generic component to display lists, either invoices or bills.
import React, { useState } from 'react';
import Bill_InvoiceDetailPopup from './Bill_InvoiceDetailPopup';
import { InvoiceType } from '../features/invoices/invoiceTypes';
import { BillType } from '../features/bills/billsType';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, TableSortLabel, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/system';
import Pagination from '@mui/material/Pagination';
import theme from '../theme/theme';

type ItemType = InvoiceType | BillType;

interface ListComponentProps {
  data: ItemType[];
  itemType: string;
}

// Logic for sorting, selecting, and paginating items.
// Handling of user interactions.
// Styles for different table elements.
// Renders the list of items.
const ListComponent: React.FC<ListComponentProps> = ({ data, itemType }) => {
  const currentTheme = useTheme();
  const isMobile = useMediaQuery(currentTheme.breakpoints.down('sm'));
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [sortField, setSortField] = useState<keyof ItemType | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  const handleSortRequest = (field: keyof ItemType) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);
  };

  const handleItemClick = (item: ItemType) => {
    setSelectedItem(item);
    setIsPopupOpen(true);
  }

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedItem(null);
  }

  const StyledPaper = styled(Paper)({
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  });

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    '&.MuiTableCell-head': {
      backgroundColor: theme.palette.grey[100],
      color: theme.palette.common.black,
      textAlign: 'center',
      borderRight: `1px solid ${theme.palette.grey[200]}`,
    },
    '&.MuiTableCell-body': {
      fontSize: 14,
      borderRight: `0.5px solid ${theme.palette.grey[200]}`,
      backgroundColor: theme.palette.grey[45],
    },
  }));

  const StyledTableRow = styled(TableRow)({
    borderBottom: '0.5px solid #ccc',
    height: '60px',
  });

  const sortedData = [...data].sort((a, b) => {
    if (!sortField) return 0;
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedData = sortedData.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div style={{ position: 'relative' }}>
      <h2>{itemType}s</h2>
      <StyledPaper>
        {isMobile ? (
          <div>
            {paginatedData.map(item => (
              <div key={item.id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}>
                <p><strong>${item.amount}</strong></p>
                <p>{new Date(item.dueDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <>
            <Table>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>
                    <TableSortLabel
                      active={sortField === 'amount'}
                      direction={sortField === 'amount' ? sortDirection : 'asc'}
                      onClick={() => handleSortRequest('amount')}
                    >
                      Amount
                    </TableSortLabel>
                  </StyledTableCell>
                  <StyledTableCell>
                    <TableSortLabel
                      active={sortField === 'dueDate'}
                      direction={sortField === 'dueDate' ? sortDirection : 'asc'}
                      onClick={() => handleSortRequest('dueDate')}
                    >
                      Date
                    </TableSortLabel>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map(item => (
                  <StyledTableRow key={item.id} onClick={() => handleItemClick(item)} style={{ cursor: 'pointer' }}>
                    <StyledTableCell>${item.amount}</StyledTableCell>
                    <StyledTableCell>{new Date(item.dueDate).toLocaleDateString()}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
        <Pagination
          count={Math.ceil(data.length / itemsPerPage)}
          page={page}
          onChange={(_event, value) => setPage(value)}
          color="primary"
          style={{
            marginTop: '0',
            padding: '5px',
            alignSelf: 'center',
            backgroundColor: theme.palette.grey[200],
          }}
        />
        {isPopupOpen && selectedItem && (
          <Bill_InvoiceDetailPopup
            item={selectedItem}
            itemType={itemType}
            onClose={handleClosePopup}
            style={{ position: 'relative', top: '50%', left: '50%', transform: 'translate(-30%, -30%)' }}
          />
        )}
      </StyledPaper>
    </div>
  );
}

export default ListComponent;
