import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components/macro';

const MenuItem = styled(NavLink)`
  padding: 1rem;

  &.active-route {
    color: hotpink;
  }
`;

const Root = styled.header`
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
    <Root>
      <nav>
        <MenuItem to='/' exact activeClassName='active-route'>
          Home
        </MenuItem>

        <MenuItem to='/locations' exact activeClassName='active-route'>
          Locations
        </MenuItem>

        <MenuItem to='/launches' exact activeClassName='active-route'>
          Launches
        </MenuItem>
      </nav>
    </Root>
  );
};

export default Header;
