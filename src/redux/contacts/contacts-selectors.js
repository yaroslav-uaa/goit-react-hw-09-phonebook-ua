import { createSelector } from '@reduxjs/toolkit';

const getContacts = state => state.contacts.items;
const getFilter = state => state.contacts.filter;
const getLoading = state => state.contacts.loading;

const getTotalContacts = state => getContacts(state).length;

// const getTotalContacts = createSelector(
//   [getContacts],
//   contacts => contacts.length,
// );

// const getFilteredContacts = state => {
//   const allContacts = getContacts(state);
//   const filter = getFilter(state);
//   const normalizedFilter = filter.toLowerCase();

//   return allContacts.filter(({ name }) =>
//     name.toLowerCase().includes(normalizedFilter),
//   );
// };

const getFilteredContacts = createSelector(
  [getContacts, getFilter],
  (allContacts, filter) => {
    const normalizedFilter = filter.toLowerCase();
    return allContacts.filter(({ name }) =>
      name.toLowerCase().includes(normalizedFilter),
    );
  },
);

export {
  getContacts,
  getFilter,
  getLoading,
  getFilteredContacts,
  getTotalContacts,
};
