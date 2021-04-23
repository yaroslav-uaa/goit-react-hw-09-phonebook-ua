import React from 'react';
import { useSelector } from 'react-redux';
import authSelectors from '../../redux/auth/auth-selectors';
import h from './HomeView.module.css';

export default function HomeView() {
  const UserName = useSelector(authSelectors.getUserName);
  return (
    <div className={h.container}>
      <h1 className={h.title}>Велкам ту ауа фелімі</h1>
      <br />
      <p className={h.user}>{UserName}</p>
      <span role="img" aria-label="Welcome icon">
        💻𝕵𝕾😎
      </span>
    </div>
  );
}

// const mapStateToProps = state => ({
//   UserName: authSelectors.getUserName(state),
// });

// export default connect(mapStateToProps)(HomeView);
