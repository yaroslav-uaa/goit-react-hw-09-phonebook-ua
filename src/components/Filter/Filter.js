import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import f from './Filter.module.css';
import { filterContacts } from '../../redux/contacts/contacts-actions';
import { getFilter } from '../../redux/contacts/contacts-selectors';

const Filter = ({ filter, onChange }) => (
  <>
    <input
      className={f.filter}
      type="text"
      name="filter"
      value={filter}
      onChange={onChange}
      placeholder="Enter name to find"
    />
  </>
);

Filter.propTypes = {
  filter: PropTypes.string,
  onChange: PropTypes.func,
};

const mapStateToProps = state => ({
  filter: getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(filterContacts(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
