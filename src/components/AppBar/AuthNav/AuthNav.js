import React from 'react';
import { NavLink } from 'react-router-dom';
import a from './AuthNav.module.css';

const AuthNav = () => (
  <div>
    <NavLink
      to="/register"
      exact
      className={a.link}
      activeClassName={a.activeLink}
    >
      Реєстрація
    </NavLink>
    <NavLink
      to="/login"
      exact
      className={a.link}
      activeClassName={a.activeLink}
    >
      Вхід
    </NavLink>
  </div>
);

export default AuthNav;
