import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import authSelectors from '../../../redux/auth/auth-selectors';
import authOperations from '../../../redux/auth/auth-operations';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import u from './UserMenu.module.css';
import { toast } from 'react-toastify';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    padding: 0,
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: '#e84a5f',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function UserMenu() {
  const dispatch = useDispatch();

  const UserEmail = useSelector(authSelectors.getUserEmail);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = useCallback(() => {
    dispatch(authOperations.logOut());
    toast.info('Good luck BRO!');
  }, [dispatch]);

  return (
    <div className={u.menu}>
      <Chip
        className={u.chip}
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
        icon={<FaceIcon className={u.icon} />}
        label={UserEmail}
        clickable
      />
      <StyledMenu
        className={u.styledMenu}
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem onClick={onLogout} className={u.btnLogOut}>
          <ExitToAppIcon />
          LogOut
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
