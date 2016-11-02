import React from 'react';
import styles from './styles.css';

export default function NestedChildrenComponent(props) {
  const { children, text, caption } = props;

  return (
    <div className={styles.wrapper}>
      <h4>NestedChildrenComponent</h4>
      {children}

      <hr />
      <h4>text</h4>
      {text}

      <hr />
      <h4>caption</h4>
      {caption}

    </div>
  );
}

NestedChildrenComponent.propTypes = {
  children: React.PropTypes.node.isRequired,
  text: React.PropTypes.node.isRequired,
  caption: React.PropTypes.node.isRequired,
};
