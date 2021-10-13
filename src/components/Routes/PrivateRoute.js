import React from 'react';
import { Redirect, Route } from 'react-router';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';

/**
 * Якщо маршрут приватний і користувач зологінений , рендерить компонент
 * В іншому випадку рендерить Redirect на /login
 */

export default function PrivateRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const isLogIn = useSelector(authSelectors.getIsLoggedIn);
  console.log(isLogIn);
  return (
    <Route
      {...routeProps}
      render={props =>
        isLogIn ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
}

// const mapStateToProps = state => ({
//   isAuthenticated: authSelectors.getIsLoggedIn(state),
// });

// export default connect(mapStateToProps, null)(PrivateRoute);
