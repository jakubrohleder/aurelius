import React from 'react';

export default function MetaInputText(props) {
  const { name, onChange, meta } = props;

  return (
    <input type="text" onChange={(event) => onChange(name, event.target.value)} value={meta[name]} />
  );
}

MetaInputText.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
