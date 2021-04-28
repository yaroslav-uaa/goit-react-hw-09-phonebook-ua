import EnhancedTable from '../../components/Contacts';
import c from './ContactView.module.css';

const ContactsView = () => {
  return (
    <div className={c.contactContainer}>
      <EnhancedTable />
    </div>
  );
};

export default ContactsView;
