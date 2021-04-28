import React from 'react';
import { NavLink } from 'react-router-dom';
import a from './AuthNav.module.css';

const AuthNav = () => (
  <div>
    {/* <NavLink
      to="/register"
      exact
      className={a.link}
      activeClassName={a.activeLink}
    >
      REGISTRATION
    </NavLink> */}
    <NavLink
      to="/login"
      exact
      className={a.link}
      activeClassName={a.activeLink}
    >
      LOGIN
    </NavLink>
  </div>
);

export default AuthNav;
