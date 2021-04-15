import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import c from './Contacts.module.css';

const Contacts = ({
  contacts,
  deleteContact,
  isLoading,
  fetchContacts,
  updateContacts,
  totalContacts,
}) => {
  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

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
      <p>number of contacts {totalContacts}</p>
      {isLoading && <h1>Загрузка</h1>}
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={c.link}>
          {inEditMode.status && inEditMode.rowKey === id ? (
            <React.Fragment>
              <form>
                <input
                  className={c.editInput}
                  value={unitName}
                  onChange={event => {
                    setUnitName(event.target.value);
                  }}
                  type="text"
                  name="name"
                  placeholder="Name"
                  title="Ім'я може містити тільки букви, апострофи, тире і пробіли. Наприклад Буся, Буся Красотуся, Буся ля Красотуся і т.д."
                  required
                  pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                />
                <input
                  className={c.editInput}
                  type="tel"
                  value={unitNumber}
                  name="number"
                  onChange={event => setUnitNumber(event.target.value)}
                  placeholder="Number"
                  title="Номер телефона повинен складатися з 11-12 цифр і може містити цифри, пробіли, тире, пузаті скобки і може починатися з +"
                  required
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                />
              </form>
              <button
                className={'btn-success'}
                onClick={() =>
                  onSave({
                    id: id,
                    name: unitName,
                    number: unitNumber,
                  })
                }
              >
                Save
              </button>
              <button
                className={'btn-secondary'}
                style={{ marginLeft: 18 }}
                onClick={() => onCancel()}
              >
                Cancel
              </button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p>{name}</p>
              <p>{number}</p>
              <div className={c.btnContainer}>
                <button
                  className={'btn-primary'}
                  onClick={() =>
                    onEdit({
                      id: id,
                      currentUnitName: name,
                      currentUnitNumber: number,
                    })
                  }
                >
                  Edit
                </button>
                <button
                  style={{ marginLeft: 18 }}
                  className={'btn-primary'}
                  onClick={() => deleteContact(id)}
                >
                  Delete
                </button>
              </div>
            </React.Fragment>
          )}
        </li>
      ))}
    </ul>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }),
  deleteContact: PropTypes.func,
};

export default Contacts;
