import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import contactsSelectors from '../../redux/contacts/contacts-selectors';
import contactsOperations from '../../redux/contacts/contacts-operations';
import f from './Form.module.css';
import PropTypes from 'prop-types';
import { Button, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import SaveIcon from '@material-ui/icons/Save';
export default function Form({ handleOpen }) {
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
    toast.info(`Wow! We knew ${unitName}`);
    handleOpen();
  };

  const handleNameChange = ({ target: { name, value } }) => {
    name === 'name' ? setName(value) : setNumber(value);
  };

  return (
    <form className={f.form} onSubmit={handleSubmit}>
      <TextField
        className={f.input}
        margin="normal"
        id="name"
        label="Name"
        name="name"
        autoComplete="off"
        autoFocus
        value={unitName}
        onChange={handleNameChange}
        inputProps={{
          pattern: "^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$",
          title:
            "Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д.",
        }}
        required
      />
      <TextField
        className={f.input}
        margin="normal"
        id="number"
        label="Number"
        name="number"
        autoComplete="true"
        autoFocus
        value={unitNumber}
        onChange={handleNameChange}
        inputProps={{
          pattern: '[0-9]{3}-[0-9]{3}-[0-9]{4}',
          title:
            'Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +',
        }}
        required
      />
      <Button type="submit" className={f.btn} startIcon={<SaveIcon />}>
        Save
      </Button>
    </form>
  );
}

Form.propTypes = {
  onSubmit: PropTypes.func,
};
