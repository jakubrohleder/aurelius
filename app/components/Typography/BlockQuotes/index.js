import React from 'react';
import styles from './styles.css';

export default function BlockQuotes(props) {
  const { children, cite } = props;

  return (
    <figure className={styles.wrapper}>
      <blockquote cite={cite}>
        {children}
      </blockquote>

      {cite &&
        <figcaption>
          <cite>
            {cite}
          </cite>
        </figcaption>
      }
    </figure>
  );
}

BlockQuotes.propTypes = {
  children: React.PropTypes.node.isRequired,
  cite: React.PropTypes.string,
};
