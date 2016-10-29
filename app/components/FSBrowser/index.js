/**
*
* FSBrowser
*
*/

import React from 'react';

import ImageWrapper from './ImageWrapper';
import styles from './styles.css';

export default function FSBrowser(props) {
  const { fs, onEdit, onRemove } = props;

  const handleChange = (oldName) => (newName) => {
    onEdit(oldName, newName);
  };

  if (Object.values(fs).length === 0) return null;

  return (
    <div className={styles.wrapper}>
      {Object.entries(fs).map(
        ([name, src]) => (
          <ImageWrapper
            key={name}
            name={name}
            src={src}
            onEdit={handleChange(name)}
            onRemove={() => onRemove(name)}
          />
        )
      )}
    </div>
  );
}

FSBrowser.propTypes = {
  fs: React.PropTypes.object.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};
