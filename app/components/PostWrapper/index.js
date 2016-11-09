/**
*
* PostWrapper
*
*/

import React from 'react';
// import ReadNext from './components/ReadNext';
// import Bio from './components/Bio';
import styles from './styles.scss';
import classNames from 'classnames';
import 'css/typography.scss';

export default function PostWrapper(props) {
  const { node, meta, fs } = props;

  const cover = fs.get(meta.get('cover')) || meta.get('cover');

  return (
    <div className={styles.wrapper}>
      <div className={styles.cover}>
        <img src={cover} role="presentation" />
      </div>
      <div className={classNames('markdown', styles.container, styles.postWrapper)}>
        <div className={styles.post}>
          <div className={styles.postTitle}>
            <h1>{meta.get('title')}</h1>
          </div>


          {node}

          <hr />

          <em style={{ display: 'none' }}>
          </em>
        </div>

        {
          // <ReadNext post={post} pages={route.pages} />
        }
      </div>
    </div>
  );
}

PostWrapper.propTypes = {
  node: React.PropTypes.node.isRequired,
  meta: React.PropTypes.object.isRequired,
  fs: React.PropTypes.object.isRequired,
};
