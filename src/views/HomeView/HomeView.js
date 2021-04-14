import React from 'react';
import h from './HomeView.module.css';

const HomeView = () => (
  <div className={h.container}>
    <h1 className={h.title}>Велкам ту ауа фелімі</h1>
    <span role="img" aria-label="Welcome icon">
      💻𝕵𝕾😎
    </span>
  </div>
);

export default HomeView;
