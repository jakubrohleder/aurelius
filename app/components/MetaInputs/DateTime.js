import React from 'react';

export default function MetaInputDateTime(props) {
  const { meta, name, onChange } = props;

  return (
    <div>
      <input type="datetime-local" onChange={(event) => onChange(name, event.target.value)} value={meta[name]} />
    </div>
  );
}

MetaInputDateTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
