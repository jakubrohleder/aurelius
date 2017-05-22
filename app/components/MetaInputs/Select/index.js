import React from 'react';

import styles from './styles.css';

export default function MetaInputSelect(props) {
  const { meta, name, keys, onChange } = props;
  const id = `${name}-input`;

  return (
    <label className={styles.wrapper} htmlFor={id}>
      <span className={styles.name}>{name}</span>
      <select
        onChange={(event) => onChange(name, event.target.value)}
        value={meta.get(name)}
      >
        {keys.map((key) =>
          <option key={key} value={key}>{key}</option>
        )}
      </select>
    </label>
  );
}

MetaInputSelect.propTypes = {
  name: React.PropTypes.string.isRequired,
  keys: React.PropTypes.array.isRequired,
  onChange: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
