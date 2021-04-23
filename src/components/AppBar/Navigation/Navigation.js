import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import authSelectors from '../../../redux/auth/auth-selectors';
import Filter from '../../Filter/Filter';
import n from './Navigation.module.css';

export default function Navigation() {
  const location = useLocation();
  const isLogIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <nav className={n.navigation}>
      <NavLink to="/" exact className={n.link} activeClassName={n.activeLink}>
        Главная
      </NavLink>
      {isLogIn && (
        <>
          <NavLink
            to="/contacts"
            exact
            className={n.link}
            activeClassName={n.activeLink}
          >
            Контакти
          </NavLink>
        </>
      )}
      {location.pathname === '/contacts' && <Filter />}
    </nav>
  );
}

// const mapStateToProps = state => ({
//   isLogIn: authSelectors.getIsLoggedIn(state),
// });

// export default connect(mapStateToProps, null)(Navigation);
