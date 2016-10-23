/**
*
* PostWrapper
*
*/

import React from 'react';

import styles from './styles.css';

export default function PostWrapper(props) {
  const { node, meta, fs } = props;

  const cover = fs[meta.cover] || meta.cover;
  const photo = fs[meta.photo] || meta.photo;

  return (
    <div className={styles.wrapper}>
      <img src={cover} role="presentation" />
      <img src={photo} role="presentation" />
      {node}
    </div>
  );
}

PostWrapper.propTypes = {
  node: React.PropTypes.node.isRequired,
  meta: React.PropTypes.object.isRequired,
  fs: React.PropTypes.object.isRequired,
};
