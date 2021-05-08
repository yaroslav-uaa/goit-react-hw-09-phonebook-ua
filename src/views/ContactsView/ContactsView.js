import { useState } from 'react';
import ContactsTable from '../../components/Contacts';
import c from './ContactView.module.css';
import { Fab } from '@material-ui/core';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TransitionsModal from '../../components/Modal/Modal';
import Form from '../../components/Form/Form';

const ContactsView = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className={c.contactContainer}>
      <ContactsTable />
      <Fab type="button" className={c.fab} onClick={handleOpen}>
        <PersonAddIcon fontSize="large" />
      </Fab>
      {open && (
        <TransitionsModal open={open} handleOpen={handleOpen}>
          <Form handleOpen={handleOpen} />
        </TransitionsModal>
      )}
    </div>
  );
};

export default ContactsView;
