import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import c from './Contacts.module.css';
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux';
import contactsOperations from '../../redux/contacts/contacts-operations';
import contactsSelectors from '../../redux/contacts/contacts-selectors';

// const mapStateToProps = state => ({
//   contacts: contactsSelectors.getFilteredContacts(state),
//   isLoading: contactsSelectors.getLoading(state),
// });

// const mapDispatchToProps = {
//   deleteContact: contactsOperations.deleteContact,
//   fetchContacts: contactsOperations.fetchContacts,
//   updateContacts: contactsOperations.updateContact,
// };

export default function Contacts() {
  const dispatch = useDispatch();

  const contacts = useSelector(contactsSelectors.getFilteredContacts);
  const isLoading = useSelector(contactsSelectors.getLoading);

  const deleteContact = useCallback(
    id => {
      dispatch(contactsOperations.deleteContact(id));
    },
    [dispatch],
  );

  const fetchContacts = useCallback(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  const updateContacts = useCallback(
    ({ name, number, id }) => {
      dispatch(contactsOperations.updateContact({ name, number, id }));
    },
    [dispatch],
  );

  const [inEditMode, setInEditMode] = useState({
    status: false,
    rowKey: null,
  });

  const [unitName, setUnitName] = useState(null);
  const [unitNumber, setUnitNumber] = useState(null);

  const onEdit = ({ id, currentUnitName, currentUnitNumber }) => {
    setInEditMode({
      status: true,
      rowKey: id,
    });
    setUnitName(currentUnitName);
    setUnitNumber(currentUnitNumber);
  };

  const updateData = ({ name, number, id }) => {
    updateContacts({ name, number, id });
  };

  const onSave = ({ name, number, id }) => {
    const originName = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() && contact.id !== id,
    );
    const originNumber = contacts.find(
      contact => contact.number === number && contact.id !== id,
    );
    if (originName) {
      alert(`${name} is already used`);
      return;
    }
    if (originNumber) {
      alert(`${number} is already used`);
      return;
    }
    updateData({ name, number, id });
    onCancel();
  };

  const onCancel = () => {
    setInEditMode({
      status: false,
      rowKey: null,
    });
    setUnitName(null);
    setUnitNumber(null);
  };

  return (
    <ul className="container">
      {isLoading && <h1>Загрузка</h1>}
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={c.link}>
          {inEditMode.status && inEditMode.rowKey === id ? (
            <React.Fragment>
              <form>
                <TextField
                  className={c.editInput}
                  multiline
                  margin="normal"
                  required
                  id="name"
                  label="Name"
                  name="name"
                  autoComplete="off"
                  autoFocus
                  value={unitName}
                  onChange={event => setUnitName(event.target.value)}
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                  title="Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д."
                />
                <TextField
                  className={c.editInput}
                  multiline
                  margin="normal"
                  required
                  id="number"
                  label="Number"
                  name="number"
                  autoComplete="off"
                  autoFocus
                  value={unitNumber}
                  onChange={event => setUnitNumber(event.target.value)}
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  title="Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +"
                />
              </form>
              <IconButton
                className={'btn-success'}
                onClick={() =>
                  onSave({
                    id: id,
                    name: unitName,
                    number: unitNumber,
                  })
                }
              >
                <SaveIcon />
              </IconButton>
              <IconButton
                className={'btn-secondary'}
                onClick={() => onCancel()}
              >
                <CancelIcon />
              </IconButton>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>{name}</p>
              <p>{number}</p>
              <div className={c.btnContainer}>
                <IconButton
                  className={'btn-primary'}
                  onClick={() =>
                    onEdit({
                      id: id,
                      currentUnitName: name,
                      currentUnitNumber: number,
                    })
                  }
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  className={'btn-primary'}
                  onClick={() => deleteContact(id)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </React.Fragment>
          )}
        </li>
      ))}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func,
};
