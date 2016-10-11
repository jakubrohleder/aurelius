/**
*
* ImageButton
*
*/

import React from 'react';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import styles from './styles.css';

export default function ImageButton(props) {
  const { handleChange } = props;

  function handleImageChange(event) {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      handleChange({
        file,
        path: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  return (
    <button className={styles.wrapper}>
      <input className="fileInput" type="file" onChange={handleImageChange} />
    </button>
  );
}

ImageButton.propTypes = {
  handleChange: React.PropTypes.func.isRequired,
};
