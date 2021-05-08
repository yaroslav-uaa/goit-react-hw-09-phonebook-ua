import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import authSelectors from '../../../../redux/auth/auth-selectors';
import contactsSelectors from '../../../../redux/contacts/contacts-selectors';

import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

import Filter from '../../../Filter/Filter';
import n from '../Navigation.module.css';

const StyledBadge = withStyles(theme => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function NavigationForDesktop() {
  const location = useLocation();
  const isLogIn = useSelector(authSelectors.getIsLoggedIn);
  const totalContacts = useSelector(contactsSelectors.getFilteredTotalContacts);

  return (
    <>
      <NavLink to="/" exact className={n.link} activeClassName={n.activeLink}>
        MAIN
      </NavLink>
      {isLogIn &&
        (location.pathname === '/contacts' ? (
          <>
            <StyledBadge badgeContent={totalContacts} color="secondary">
              <NavLink
                to="/contacts"
                exact
                className={n.link}
                activeClassName={n.activeLink}
              >
                CONTACTS
              </NavLink>
            </StyledBadge>
            <Filter />
          </>
        ) : (
          <NavLink
            to="/contacts"
            exact
            className={n.link}
            activeClassName={n.activeLink}
          >
            CONTACTS
          </NavLink>
        ))}
    </>
  );
}
