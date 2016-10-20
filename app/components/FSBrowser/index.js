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

  const handleChange = (name) => (newName) => {
    const { file, path } = fs[name];

    onEdit(name, { file: { ...file, name: newName }, path });
  };

  return (
    <div className={styles.wrapper}>
      {Object.entries(fs).map(
        ([name, { path }]) => (
          <ImageWrapper
            key={name}
            name={name}
            path={path}
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
