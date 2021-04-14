import React from 'react';
import { connect } from 'react-redux';
import authSelectors from '../../../redux/auth/auth-selectors';
import u from './UserMenu.module.css';
import defaultAvatar from './avatar.png';
import authOperations from '../../../redux/auth/auth-operations';

const UserMenu = ({ avatar, name, onLogout }) => (
  <div className={u.container}>
    <img src={avatar} alt="" width="32" className={u.avatar} />
    <span className={u.name}>Welcome, {name}</span>
    <button type="button" onClick={onLogout} className={u.btn}>
      LogOut
    </button>
  </div>
);

const mapStateToProps = state => ({
  name: authSelectors.getUsername(state),
  avatar: defaultAvatar,
});

const mapDispatchToProps = {
  onLogout: authOperations.logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
