import React from 'react';
import ImageButton from 'components/ImageButton';

export default function MetaInputDateTime(props) {
  const { meta, name, onChange, onChangeImage } = props;

  function handleChange({ file, path }) {
    onChange(name, file.name);
    onChangeImage({ file, path });
  }

  return (
    <ImageButton onChange={handleChange} value={meta[name]} />
  );
}

MetaInputDateTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onChangeImage: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
