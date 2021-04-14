import { connect } from 'react-redux';
import {
  deleteContact,
  fetchContacts,
  updateContact,
} from '../../redux/contacts/contacts-operations';
import Contacts from './Contacts';
import {
  getFilteredContacts,
  getLoading,
  getTotalContacts,
} from '../../redux/contacts/contacts-selectors';

const mapStateToProps = state => ({
  contacts: getFilteredContacts(state),
  isLoading: getLoading(state),
  totalContacts: getTotalContacts(state),
});

const mapDispatchToProps = dispatch => ({
  deleteContact: id => dispatch(deleteContact(id)),
  fetchContacts: () => dispatch(fetchContacts()),
  updateContacts: ({ name, number, id }) =>
    dispatch(updateContact({ name, number, id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);
