import React from 'react';
import ButtonImage from 'components/ButtonImage';

export default function MetaInputDateTime(props) {
  const { meta, name, onChange, onChangeImage } = props;

  function handleChange({ file, path }) {
    onChange(name, file.name);
    onChangeImage({ file, path });
  }

  return (
    <ButtonImage onChange={handleChange} value={meta[name]} />
  );
}

MetaInputDateTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onChangeImage: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
