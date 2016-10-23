/**
*
* ButtonImage
*
*/

import React from 'react';
import ButtonUpload from 'components/ButtonUpload';

export default function ButtonImage(props) {
  const { onChange } = props;

  function handleImageChange(files) {
    console.log(files);
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
    <ButtonUpload {...props} onChange={handleImageChange} />
  );
}

ButtonImage.propTypes = {
  onChange: React.PropTypes.func.isRequired,
};
