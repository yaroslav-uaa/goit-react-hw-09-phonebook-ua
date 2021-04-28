import React from 'react';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import AuthNav from './AuthNav/AuthNav';
import Navigation from './Navigation/Navigation';
import UserMenu from './UserMenu/UserMenu';
import a from './AppBar.module.css';

export default function AppBar() {
  const isLogIn = useSelector(authSelectors.getIsLoggedIn);
  return (
    <header className={a.header}>
      <Navigation />
      {isLogIn ? <UserMenu /> : <AuthNav />}
    </header>
  );
}
