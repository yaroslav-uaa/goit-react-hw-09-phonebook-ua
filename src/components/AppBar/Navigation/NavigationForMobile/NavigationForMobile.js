import { Button, Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import authSelectors from '../../../../redux/auth/auth-selectors';
import Filter from '../../../Filter/Filter';
import { withStyles } from '@material-ui/core/styles';

import n from '../Navigation.module.css';

const StyledMenu = withStyles({
  list: {
    backgroundColor: '#36464d',
  },
})(Menu);

const StyledMenuItem = withStyles(theme => ({
  root: {
    textAlign: 'center',
    justifyContent: 'center',

    '&:focus': {
      backgroundColor: '#2a363b',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function NavigationForMobile() {
  const location = useLocation();
  const isLogIn = useSelector(authSelectors.getIsLoggedIn);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button
        className={n.Button}
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Menu
      </Button>
      <StyledMenu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={handleClose}>
          <NavLink
            to="/"
            exact
            className={n.link}
            activeClassName={n.activeLink}
          >
            MAIN
          </NavLink>
        </StyledMenuItem>
        {isLogIn &&
          (location.pathname === '/contacts' ? (
            <div>
              <StyledMenuItem onClick={handleClose}>
                <NavLink
                  to="/contacts"
                  exact
                  className={n.link}
                  activeClassName={n.activeLink}
                >
                  CONTACTS
                </NavLink>
              </StyledMenuItem>
              <StyledMenuItem>
                <Filter />
              </StyledMenuItem>
            </div>
          ) : (
            <StyledMenuItem onClick={handleClose}>
              <NavLink
                to="/contacts"
                exact
                className={n.link}
                activeClassName={n.activeLink}
              >
                CONTACTS
              </NavLink>
            </StyledMenuItem>
          ))}
      </StyledMenu>
    </div>
  );
}
