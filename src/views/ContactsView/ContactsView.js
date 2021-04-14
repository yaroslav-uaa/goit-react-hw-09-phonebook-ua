import Section from '../../components/Section/Section';
import Form from '../../components/Form/Form';
import Filter from '../../components/Filter/Filter';
import Contacts from '../../components/Contacts/Contacts.container';

const ContactsView = () => {
  return (
    <>
      <Section title="Phonebook">
        <Form />
      </Section>
      <Section title="Contacts">
        <Filter />
        <Contacts />
      </Section>
    </>
  );
};

export default ContactsView;
