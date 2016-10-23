import React from 'react';
import ButtonImage from 'components/ButtonImage';

export default function MetaInputImage(props) {
  const { meta, name, onChange, onChangeImage } = props;

  function handleChange(fileName, src) {
    onChange(name, fileName);
    onChangeImage(fileName, src);
  }

  return (
    <ButtonImage onChange={handleChange} value={meta[name]} />
  );
}

MetaInputImage.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onChangeImage: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
