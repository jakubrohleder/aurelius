import React from 'react';

import styles from './styles.css';

export default function MetaInputImage(props) {
  const { meta, name, onChange, onChangeImage } = props;
  const id = `${name}-input`;
  const value = meta.get(name, 'Add image');

  function handleChange(event) {
    const files = event.target.files;

    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(name, file.name);
      onChangeImage(file.name, reader.result);
    };

    reader.readAsDataURL(file);
  }

  return (
    <label className={styles.wrapper} htmlFor={id}>
      <span className={styles.name}>{name}</span>
      <span className={styles.value}>{value}</span>
      <input
        type="file"
        id={id}
        className={styles.input}
        onChange={handleChange}
      />
    </label>
  );
}

MetaInputImage.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onChangeImage: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
