import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';
import styles from '../styles/Spinner.module.css'; // Adjust path as needed

const Spinner = ({ variant = 'primary', size = 'sm' }) => {
  return (
    <div className={styles.spinnerContainer}>
      <BootstrapSpinner animation="border" variant={variant} size={size} />
    </div>
  );
};

export default Spinner;