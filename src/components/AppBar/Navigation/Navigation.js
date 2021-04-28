import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import authSelectors from '../../../redux/auth/auth-selectors';
import { Button } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import Filter from '../../Filter/Filter';
import n from './Navigation.module.css';
import TransitionsModal from '../../Modal/Modal';
import Form from '../../Form/Form';

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const isLogIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <nav className={n.navigation}>
      <NavLink to="/" exact className={n.link} activeClassName={n.activeLink}>
        MAIN
      </NavLink>
      {isLogIn && (
        <>
          <NavLink
            to="/contacts"
            exact
            className={n.link}
            activeClassName={n.activeLink}
          >
            CONTACTS
          </NavLink>
        </>
      )}
      {location.pathname === '/contacts' && (
        <>
          <Filter />
          <Button type="button" className={n.btn} onClick={handleOpen}>
            <PersonAddIcon fontSize="large" />
          </Button>
          {open && (
            <TransitionsModal open={open} handleOpen={handleOpen}>
              <Form handleOpen={handleOpen} />
            </TransitionsModal>
          )}
        </>
      )}
    </nav>
  );
}
