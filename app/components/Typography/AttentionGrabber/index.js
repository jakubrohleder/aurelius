import React from 'react';

export default function AttentionGrabber(props) {
  const { children } = props;

  return (
    <div className="attention-grabber">
      {children}
    </div>
  );
}

AttentionGrabber.propTypes = {
  children: React.PropTypes.node.isRequired,
};
