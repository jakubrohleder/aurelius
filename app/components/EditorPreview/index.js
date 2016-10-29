import React from 'react';
import styles from './styles.css';

export default function EditorPreview(props) {
  const { wrapper, node, meta, fs } = props;

  if (wrapper == null) {
    return (
      <div className={styles.wrapper}>
        {node}
      </div>
    );
  }
  return wrapper({ node, meta, fs });
}

EditorPreview.propTypes = {
  wrapper: React.PropTypes.func,
  meta: React.PropTypes.object.isRequired,
  node: React.PropTypes.node.isRequired,
  fs: React.PropTypes.object.isRequired,
};
