import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import contactsActions from '../../redux/contacts/contacts-actions';
import contactsSelectors from '../../redux/contacts/contacts-selectors';
import { fade, InputBase, makeStyles } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    height: '90%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(7),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    fontFamily: 'Exo 2',
    fontWeight: 400,
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Filter() {
  const classes = useStyles();
  const dispatch = useDispatch();

  const filter = useSelector(contactsSelectors.getFilter);

  const onChange = useCallback(
    e => dispatch(contactsActions.filterContacts(e.target.value)),
    [dispatch],
  );

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search contact…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        value={filter}
        onChange={onChange}
      />
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};
