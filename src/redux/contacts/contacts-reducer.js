import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import contactsActions from './contacts-actions';

const items = createReducer([], {
  [contactsActions.fetchContactsSuccess]: (state, { payload }) => payload,
  [contactsActions.addContactSuccess]: (state, { payload }) => [
    ...state,
    payload,
  ],
  [contactsActions.updateContactSuccess]: (state, { payload }) =>
    state.map(contact => (contact.id === payload.id ? payload : contact)),
  [contactsActions.deleteContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== payload),
});

const filter = createReducer('', {
  [contactsActions.filterContacts]: (state, { payload }) => payload,
});

const loading = createReducer(false, {
  [contactsActions.fetchContactsRequest]: () => true,
  [contactsActions.fetchContactsSuccess]: () => false,
  [contactsActions.fetchContactsError]: () => false,
  [contactsActions.addContactRequest]: () => true,
  [contactsActions.addContactSuccess]: () => false,
  [contactsActions.addContactError]: () => false,
  [contactsActions.deleteContactRequest]: () => true,
  [contactsActions.deleteContactSuccess]: () => false,
  [contactsActions.deleteContactError]: () => false,
  [contactsActions.updateContactRequest]: () => true,
  [contactsActions.updateContactSuccess]: () => false,
  [contactsActions.updateContactError]: () => false,
});

export default combineReducers({
  items,
  filter,
  loading,
});
