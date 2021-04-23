import axios from 'axios';
import contactsActions from './contacts-actions';

axios.defaults.baseURL = 'https://goit-phonebook-api.herokuapp.com';

const fetchContacts = () => async dispatch => {
  dispatch(contactsActions.fetchContactsRequest());
  try {
    const { data } = await axios.get('/contacts');
    dispatch(contactsActions.fetchContactsSuccess(data));
  } catch (error) {
    dispatch(contactsActions.fetchContactsError(error.message));
  }
  // axios
  //   .get('/contacts')
  //   .then(({ data }) => dispatch(fetchContactsSuccess(data)))
  //   .catch(error => dispatch(fetchContactsError(error)));
};

const addContact = ({ name, number }) => async dispatch => {
  dispatch(contactsActions.addContactRequest());
  const contact = { name, number };
  try {
    const { data } = await axios.post('/contacts', contact);
    dispatch(contactsActions.addContactSuccess(data));
  } catch (error) {
    dispatch(contactsActions.addContactError(error.message));
  }

  // axios
  //   .post('/contacts', contact)
  //   .then(({ data }) => dispatch(addContactSuccess(data)))
  //   .catch(error => dispatch(addContactError(error)));
};

const updateContact = ({ name, number, id }) => async dispatch => {
  dispatch(contactsActions.updateContactRequest());
  const update = { name, number };
  try {
    const { data } = await axios.patch(`/contacts/${id}`, update);
    dispatch(contactsActions.updateContactSuccess(data));
  } catch (error) {
    dispatch(contactsActions.updateContactError(error.message));
  }
};

const deleteContact = id => async dispatch => {
  dispatch(contactsActions.deleteContactRequest());
  try {
    await axios.delete(`/contacts/${id}`);
    dispatch(contactsActions.deleteContactSuccess(id));
  } catch (error) {
    dispatch(contactsActions.deleteContactError(error.message));
  }
  // axios
  //   .delete(`/contacts/${id}`)
  //   .then(() => dispatch(deleteContactSuccess(id)))
  //   .catch(error => dispatch(deleteContactError(error)));
};

const contactsOperations = {
  addContact,
  deleteContact,
  fetchContacts,
  updateContact,
};

export default contactsOperations;
