import React from 'react';
import styles from './styles.css';

export default function AttentionGrabber(props) {
  const { children } = props;

  return (
    <p className={styles.wrapper}>
      {children}
    </p>
  );
}

AttentionGrabber.propTypes = {
  children: React.PropTypes.node.isRequired,
};
