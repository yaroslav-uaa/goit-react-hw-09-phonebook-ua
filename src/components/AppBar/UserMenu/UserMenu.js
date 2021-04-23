import React, { useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';

import authSelectors from '../../../redux/auth/auth-selectors';
import authOperations from '../../../redux/auth/auth-operations';
import contactsSelectors from '../../../redux/contacts/contacts-selectors';

import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import FaceIcon from '@material-ui/icons/Face';
import CustomBadge from './CustomBadge/CustomBadge';
import './UserMenu.css';

// const mapStateToProps = state => ({
//   UserEmail: authSelectors.getUserEmail(state),
//   totalContacts: contactsSelectors.getFilteredTotalContacts(state),
// });

// const mapDispatchToProps = {
//   onLogout: authOperations.logOut,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);

export default function UserMenu() {
  const dispatch = useDispatch();
  const location = useLocation();

  const UserEmail = useSelector(authSelectors.getUserEmail);
  const totalContacts = useSelector(contactsSelectors.getFilteredTotalContacts);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = useCallback(() => {
    dispatch(authOperations.logOut());
  }, [dispatch]);

  return (
    <div className="menu">
      {location.pathname === '/contacts' && (
        <div className="badge">
          <CustomBadge className="badge" totalContacts={totalContacts} />
        </div>
      )}

      <Chip
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        icon={<FaceIcon />}
        label={UserEmail}
        clickable
        color="primary"
      />

      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={onLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
