import React from 'react';
import styles from './styles.css';

export default function Quote(props) {
  const { children, cite } = props;

  return (
    <figure className={styles.wrapper}>
      <blockquote>
        <p>
          {children}
        </p>
        {cite &&
          <footer>
            <cite dangerouslySetInnerHTML={{ __html: cite }} />
          </footer>
        }
      </blockquote>
    </figure>
  );
}

Quote.propTypes = {
  children: React.PropTypes.node.isRequired,
  cite: React.PropTypes.string,
};
