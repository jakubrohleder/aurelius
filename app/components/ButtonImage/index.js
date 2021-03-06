/**
*
* ButtonImage
*
*/

import React from 'react';
import Button from 'components/Button';
import InputUpload from 'components/InputUpload';

export default function ButtonImage(props) {
  const { onChange, children } = props;

  function handleImageChange(files) {
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(file.name, reader.result);
      };

      reader.readAsDataURL(file);
    }
  }

  return (
    <Button>
      <InputUpload {...props} onChange={handleImageChange}>
        {children}
      </InputUpload>
    </Button>
  );
}

ButtonImage.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  children: React.PropTypes.node.isRequired,
};

ButtonImage.defaultProps = {
  children: <div>Add images</div>,
};
