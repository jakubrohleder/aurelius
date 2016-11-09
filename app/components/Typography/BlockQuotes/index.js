import React from 'react';
import styles from './styles.css';

export default function BlockQuotes(props) {
  const { children, cite } = props;

  return (
    <figure className={styles.wrapper}>
      <blockquote cite={cite}>
        {children}
        {cite &&
          <footer>
            <cite>
              {cite}
            </cite>
          </footer>
        }
      </blockquote>
    </figure>
  );
}

BlockQuotes.propTypes = {
  children: React.PropTypes.node.isRequired,
  cite: React.PropTypes.string,
};
