import React from 'react';

import styles from './styles.css';

export default function MetaInputDateTime(props) {
  const { meta, name, onChange } = props;
  const id = `${name}-input`;

  return (
    <label className={styles.wrapper} htmlFor={id}>
      <span className={styles.name}>{name}</span>
      <input
        type="datetime-local"
        onChange={(event) => onChange(name, event.target.value)}
        value={meta[name]}
      />
    </label>
  );
}

MetaInputDateTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
