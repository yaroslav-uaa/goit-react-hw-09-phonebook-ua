import React from 'react';
import { Redirect, Route } from 'react-router';
import { connect } from 'react-redux';
import authSelectors from '../../../redux/auth/auth-selectors';

/**
 * Якщо маршрут приватний і користувач зологінений , рендерить компонент
 * В іншому випадку рендерить Redirect на /login
 */

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  ...routeProps
}) => (
  <Route
    {...routeProps}
    render={props =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

const mapStateToProps = state => ({
  isAuthenticated: authSelectors.getIsLoggedIn(state),
});

export default connect(mapStateToProps, null)(PrivateRoute);
