/**
*
* ButtonZip
*
*/

import React from 'react';
import InputUpload from 'components/InputUpload';
import Button from 'components/Button';
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
    <Button>
      <InputUpload {...props} onChange={handleImageChange} />
    </Button>
  );
}

ButtonZip.propTypes = {
  onChange: React.PropTypes.func.isRequired,
};
