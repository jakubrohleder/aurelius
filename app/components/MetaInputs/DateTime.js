import React from 'react';

export default function MetaInputDateTime(props) {
  const { meta, name, onChange } = props;

  const tzoffset = (new Date()).getTimezoneOffset() * 60000;
  const localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, 19);

  return (
    <input
      type="datetime-local"
      onChange={(event) => onChange(name, event.target.value)}
      value={meta[name] || localISOTime}
    />
  );
}

MetaInputDateTime.propTypes = {
  name: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  meta: React.PropTypes.object.isRequired,
};
