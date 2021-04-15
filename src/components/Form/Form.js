import React, { useState } from 'react';
import { connect } from 'react-redux';
import { getContacts } from '../../redux/contacts/contacts-selectors';
import { addContact } from '../../redux/contacts/contacts-operations';
import f from './Form.module.css';
import PropTypes from 'prop-types';

const Form = ({ onSubmit, contacts }) => {
  const [nameUnit, setName] = useState('');
  const [numberUnit, setNumber] = useState('');

  const handleSubmit = ({ name, number }) => {
    const originName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    const originNumber = contacts.find(contact => contact.number === number);
    if (originName) {
      alert(`${name} is already used`);
      return;
    }
    if (originNumber) {
      alert(`${number} is already used`);
      return;
    }
    onSubmit({ name, number });
    setName('');
    setNumber('');
  };

  const handleNameChange = ({ target: { name, value } }) => {
    name === 'name' ? setName(value) : setNumber(value);
  };

  return (
    <form
      className={f.form}
      onSubmit={e => {
        e.preventDefault();
        handleSubmit({ name: nameUnit, number: numberUnit });
      }}
    >
      <label className={f.label}>
        Name
        <input
          type="text"
          name="name"
          value={nameUnit}
          placeholder="Enter your name"
          onChange={handleNameChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д."
          required
        />
      </label>
      <label className={f.label}>
        Number
        <input
          type="tel"
          name="number"
          value={numberUnit}
          placeholder="Enter your number"
          onChange={handleNameChange}
          pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
          title="Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +"
          required
        />
      </label>
      <button type="submit" className={f.btn}>
        Add contact
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func,
};

const mapStateToProps = state => ({
  contacts: getContacts(state),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: item => dispatch(addContact(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
