/**
*
* PostWrapper
*
*/

import React from 'react';

import styles from './styles.css';

export default function PostWrapper(props) {
  const { node, meta, fs } = props;

  const cover = fs[meta.cover] ? fs[meta.cover].path : meta.cover;
  const photo = fs[meta.photo] ? fs[meta.photo].path : meta.photo;

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
