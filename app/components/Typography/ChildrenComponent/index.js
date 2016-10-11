import React from 'react';
import styles from './styles.css';

export default function ChildrenComponent(props) {
  const { children } = props;

  return (
    <div className={styles.wrapper}>
      <h4>ChildrenComponent</h4>
      {children}
    </div>
  );
}

ChildrenComponent.propTypes = {
  children: React.PropTypes.node.isRequired,
};
