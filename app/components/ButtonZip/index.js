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
  const { onChange, children } = props;

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
      <InputUpload
        {...props}
        accept=".zip, application/zip, application/octet-stream"
        onChange={handleImageChange}
      >
        {children}
      </InputUpload>
    </Button>
  );
}

ButtonZip.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
};

ButtonZip.defaultProps = {
  children: <div>Add zip</div>,
};
