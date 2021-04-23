import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import authSelectors from '../../redux/auth/auth-selectors';

// const mapStateToProps = state => ({
//   isAuthenticated: authSelectors.getIsLoggedIn(state),
// });

// export default connect(mapStateToProps, null)(PublicRoute);

/**
 * * Якщо маршрут обмежений, і користувач залогінений, рендерить редирект на /contacts
 * * В іншому випадку рендерить компонент
 */

export default function PublicRoute({
  component: Component,
  redirectTo,
  ...routeProps
}) {
  const isLogIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <Route
      {...routeProps}
      render={props =>
        isLogIn && routeProps.restricted ? (
          <Redirect to={redirectTo} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}
