/**
*
* FSBrowser
*
*/

import React from 'react';

import ImageWrapper from './ImageWrapper';
import styles from './styles.css';
import empty from './empty.svg';

export default function FSBrowser(props) {
  const { fs, onEdit, onRemove } = props;

  const handleChange = (oldName) => (newName) => {
    onEdit(oldName, newName);
  };

  if (fs.size === 0) {
    return (
      <div className={styles.empty}>
        <img src={empty} role="presentation" />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {Object.entries(fs.toJS()).map(
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
