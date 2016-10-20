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

  return (
    <div className={styles.wrapper}>
      <p>{JSON.stringify(meta)}</p>

      <img src={cover} alt="cover" />

      {node}
    </div>
  );
}

PostWrapper.propTypes = {
  node: React.PropTypes.node.isRequired,
  meta: React.PropTypes.object.isRequired,
  fs: React.PropTypes.object.isRequired,
};
