import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

const MenuItem = styled(NavLink)`
  padding: 1rem;

  &.active-route {
    color: hotpink;
  }
`;

const StyledHeader = styled.header`
  background-color: #282c34;
  height: 6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
`;

const Header = () => {
  return (
    <StyledHeader>
      <nav>
        <MenuItem to='/' exact activeClassName='active-route'>
          Home
        </MenuItem>

        <MenuItem to='/landingPads' exact activeClassName='active-route'>
          Landing Pads
        </MenuItem>
      </nav>
    </StyledHeader>
  );
};

export default Header;
