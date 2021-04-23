import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import contactsSelectors from '../../redux/contacts/contacts-selectors';
import contactsOperations from '../../redux/contacts/contacts-operations';
import f from './Form.module.css';
import PropTypes from 'prop-types';
import { IconButton, TextField } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

// const mapStateToProps = state => ({
//   contacts: contactsSelectors.getContacts(state),
// });

// const mapDispatchToProps = {
//   onSubmit: contactsOperations.addContact,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Form);
export default function Form() {
  const dispatch = useDispatch();

  const contacts = useSelector(contactsSelectors.getContacts);

  const OnSubmit = useCallback(
    ({ name, number }) => {
      dispatch(contactsOperations.addContact({ name, number }));
    },
    [dispatch],
  );

  const [unitName, setName] = useState('');
  const [unitNumber, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    const originName = contacts.find(
      ({ name }) => name.toLowerCase() === unitName.toLowerCase(),
    );
    const originNumber = contacts.find(({ number }) => number === unitNumber);
    if (originName) {
      alert(`${unitName} is already used`);
      return;
    }
    if (originNumber) {
      alert(`${unitNumber} is already used`);
      return;
    }
    OnSubmit({ name: unitName, number: unitNumber });
    setName('');
    setNumber('');
  };

  const handleNameChange = ({ target: { name, value } }) => {
    name === 'name' ? setName(value) : setNumber(value);
  };

  return (
    <form className={f.form} onSubmit={handleSubmit}>
      <TextField
        multiline
        margin="normal"
        required
        id="name"
        label="Name"
        name="name"
        autoComplete="off"
        autoFocus
        value={unitName}
        onChange={handleNameChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д."
      />
      <TextField
        multiline
        margin="normal"
        required
        id="number"
        label="Number"
        name="number"
        autoComplete="off"
        autoFocus
        value={unitNumber}
        onChange={handleNameChange}
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        title="Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +"
      />
      <IconButton type="submit" className={f.btn}>
        <PersonAddIcon fontSize="large" />
      </IconButton>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
};
