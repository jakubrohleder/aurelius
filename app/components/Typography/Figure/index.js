import React from 'react';
import styles from './styles.css';

export default function Figure(props) {
  const { children, src, alt } = props;

  return (
    <figure className={styles.wrapper}>
      <img src={src} alt={alt} />
      {children}
    </figure>
  );
}

Figure.propTypes = {
  children: React.PropTypes.node,
  src: React.PropTypes.string.isRequired,
  alt: React.PropTypes.string.isRequired,
};
