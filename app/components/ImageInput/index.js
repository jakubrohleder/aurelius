/**
*
* ImageInput
*
*/

import React from 'react';

export default function ImageInput(props) {
  const { onChange, value } = props;

  function handleImageChange(event) {
    event.preventDefault();

    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      onChange({
        file,
        path: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  return (
    <div>
      <p>{value}</p>
      <input className="fileInput" type="file" onChange={handleImageChange} />
    </div>
  );
}

ImageInput.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
};
