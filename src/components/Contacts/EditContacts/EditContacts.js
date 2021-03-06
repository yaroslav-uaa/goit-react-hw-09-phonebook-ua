import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import c from './EditContacts.module.css';
import { IconButton, TextField } from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import SaveIcon from '@material-ui/icons/Save';
import { useSelector, useDispatch } from 'react-redux';
import contactsSelectors from '../../../redux/contacts/contacts-selectors';
import contactsOperations from '../../../redux/contacts/contacts-operations';
import { toast } from 'react-toastify';

export default function EditContacts({ contactForEdit, handleOpen }) {
  const dispatch = useDispatch();

  const contacts = useSelector(contactsSelectors.getFilteredContacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [id, setId] = useState('');

  useEffect(() => {
    if (contactForEdit) {
      const { id, name, number } = contactForEdit;
      setId(id);
      setName(name);
      setNumber(number);
    }

    return () => {
      setId('');
      setName('');
      setNumber('');
    };
  }, [contactForEdit]);

  const updateContacts = useCallback(
    ({ name, number, id }) => {
      dispatch(contactsOperations.updateContact({ name, number, id }));
    },
    [dispatch],
  );

  const handleSubmit = e => {
    e.preventDefault();

    const originName = contacts.find(
      contact =>
        contact.name.toLowerCase() === name.toLowerCase() && contact.id !== id,
    );
    const originNumber = contacts.find(
      contact => contact.number === number && contact.id !== id,
    );
    if (originName) {
      toast.error(`${name} is already used`);
      return;
    }
    if (originNumber) {
      toast.error(`${number} is already used`);
      return;
    }
    updateContacts({ name, number, id });
    onCancel();
  };

  const onCancel = () => {
    setName('');
    setNumber('');
    handleOpen();
  };

  const phoneRegex = /^\(?([0-9]{3})\)?[-.]?([0-9]{3})[-.]?([0-9]{4})$/;

  const handleInput = number => {
    return number.replace(phoneRegex, '($1)-$2-$3');
  };

  return (
    <>
      <form className={c.form} onSubmit={handleSubmit}>
        <TextField
          className={c.editInput}
          margin="normal"
          required
          id="name"
          label="Name"
          name="name"
          autoComplete="name"
          autoFocus
          value={name}
          onChange={event => setName(event.target.value)}
          inputProps={{
            pattern:
              "^[a-zA-Z??-????-??]+(([' -][a-zA-Z??-????-?? ])?[a-zA-Z??-????-??]*)*$",
            title:
              "????'?? ???????? ?????????????? ???????????? ??????????, ??????????????????, ???????? ?? ??????????????. ?????????????????? ????????, ???????? ??????????????????, ???????? ???? ?????????????????? ?? ??.??.",
          }}
        />
        <TextField
          className={c.editInput}
          margin="normal"
          id="number"
          label="Number"
          name="number"
          autoComplete="number"
          type="tel"
          autoFocus
          required
          helperText="xxx-xxx-xxxx"
          inputProps={{
            pattern: '[0-9 ()]{5}-[0-9]{3}-[0-9]{4}',
            title:
              '?????????? ???????????????? ?????????????? ???????????????????? ?? 11-12 ???????? ?? ???????? ?????????????? ??????????, ??????????????, ????????, ???????????? ???????????? ?? ???????? ???????????????????? ?? +',
          }}
          value={number}
          onChange={event => setNumber(handleInput(event.target.value))}
        />
        <div className={c.btnContainer}>
          <IconButton className={c.btn} type="submit">
            <SaveIcon fontSize="large" />
          </IconButton>
          <IconButton className={c.btn} onClick={() => onCancel()}>
            <CancelIcon fontSize="large" />
          </IconButton>
        </div>
      </form>
    </>
  );
}

EditContacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
};
