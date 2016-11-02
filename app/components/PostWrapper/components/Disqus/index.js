import React from 'react'
import ReactDisqusThread from 'react-disqus-thread'

export default function Disqus(props) {
  return (
    <ReactDisqusThread
      shortname="goloko-pl"
      identifier={props.identifier}
      title={props.title}
      url={window.location.href}
      onNewComment={() => {}}
    />
  )
}

Disqus.propTypes = {
  identifier: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
}
