import React from 'react';
import ImageInput from 'components/ImageInput';

export default function MetaInputDateTime(props) {
  const { meta, name, onChange, onChangeImage } = props;

  function handleChange({ file, path }) {
    onChange(name, file.name);
    onChangeImage({ file, path });
  }

  return (
    <div>
      <ImageInput onChange={handleChange} value={meta[name]} />
    </div>
  );
}

MetaInputDateTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onChangeImage: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
