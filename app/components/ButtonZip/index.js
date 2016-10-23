/**
*
* ButtonZip
*
*/

import React from 'react';
import ButtonUpload from 'components/ButtonUpload';
import JSZip from 'jszip';

export default function ButtonZip(props) {
  const { onChange } = props;

  function handleImageChange(files) {
    event.preventDefault();

    const reader = new FileReader();
    const file = files[0];

    reader.onloadend = () => {
      JSZip.loadAsync(reader.result).then(onChange);
    };

    reader.readAsArrayBuffer(file);
  }

  return (
    <ButtonUpload {...props} onChange={handleImageChange} />
  );
}

ButtonZip.propTypes = {
  onChange: React.PropTypes.func.isRequired,
};
