import React from 'react';
import styles from './styles.css';

export default function PullQuotes(props) {
  const { children } = props;

  return (
    <aside className={styles.wrapper}>
      <blockquote>
        {children}
      </blockquote>
    </aside>
  );
}

PullQuotes.propTypes = {
  children: React.PropTypes.node.isRequired,
};
