import React from 'react';
import styles from './styles.css';

export default function PropsComponent(props) {
  const { name } = props;

  return (
    <div className={styles.wrapper}>
      <h4>PropsComponent</h4>
      I'm Props Component my name is {name}
    </div>
  );
}

PropsComponent.propTypes = {
  name: React.PropTypes.string.isRequired,
};
