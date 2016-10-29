import React from 'react';

import styles from './styles.css';

export default function MetaInputText(props) {
  const { name, onChange, meta } = props;
  const id = `${name}-input`;

  return (
    <label className={styles.wrapper} htmlFor={id}>
      <span className={styles.name}>{name}</span>
      <input
        type="text"
        id={id}
        className={styles.input}
        onChange={(event) => onChange(name, event.target.value)} value={meta[name] || ''}
      />
    </label>
  );
}

MetaInputText.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
