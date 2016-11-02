import React from 'react';
import styles from './styles.css';

export default function SimpleComponent() {
  return (
    <div className={styles.wrapper}>
      <h4>SimpleComponent</h4>
      Just a simple component.
    </div>
  );
}

SimpleComponent.propTypes = {};
