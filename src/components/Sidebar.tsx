import { ListItemText } from '@mui/material';
import styled from '@emotion/styled';
import { NavLink } from 'react-router-dom';

// Styling for the overall sidebar container
const SidebarContainer = styled('div')`
  background-color: #f3f2fe;
  height: 100vh;
  padding: 25px 0;
  box-sizing: border-box;
  width: 250px;
  color: #000;
`;

// Styling for the menu title
const MenuTitle = styled('div')`
  font-size: 1rem;
  margin: 0 10px 1px 5px;
  text-align: start;
  color: #000;
  margin-top: 250px;
  width: 100%;
`;

// Container for the list items
const ListContainer = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: start;
  padding-left: 10px;
`;

// Chevron icon styling
const Chevron = styled('div')`
  width: 5px;
  height: 5px;
  border-top: 1px solid #000;
  border-right: 1px solid #000;
  transform: rotate(45deg);
  margin-right: 15px;
`;

// Styling for the list item links
const StyledListItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 4px 10px;
  width: 90%;
  justify-content: start;
  text-decoration: none;
  color: white;
  font-weight: 400;
  border-radius: 8px;
  transition: background-color 0.2s;
  margin: 5px 0;
  color: #000;

  &:hover {
    background-color: #7f4591;
    color: white;
  }

  &.active {
    background-color: #7f4591;
    color: white;
  }
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <MenuTitle>Menu</MenuTitle>
      <ListContainer>
        <StyledListItemLink to="/invoices">
          <Chevron /><ListItemText primary="Invoices" />
        </StyledListItemLink>
        <StyledListItemLink to="/bills">
          <Chevron /><ListItemText primary="Bills" />
        </StyledListItemLink>
      </ListContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
