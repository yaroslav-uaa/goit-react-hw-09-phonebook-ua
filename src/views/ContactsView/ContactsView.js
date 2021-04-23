import Section from '../../components/Section/Section';
import Form from '../../components/Form/Form';
import Contacts from '../../components/Contacts/Contacts';

const ContactsView = () => {
  return (
    <>
      <Section title="Phonebook">
        <Form />
      </Section>
      <Section title="Contacts">
        <Contacts />
      </Section>
    </>
  );
};

export default ContactsView;
