import React from 'react';
import markdownToReactComponent from 'utils/markdownToReactComponent';
import styles from './styles.css';

export default function EditorPreview(props) {
  const { content, components, fs, wrapper } = props;
  const { node, meta } = markdownToReactComponent(content, components, fs);

  if (wrapper == null) {
    return (
      <div className={styles.wrapper}>
        <p>{JSON.stringify(meta)}</p>
        <hr />
        {node}
      </div>
    );
  }
  return wrapper({ node, meta, fs });
}

EditorPreview.propTypes = {
  wrapper: React.PropTypes.func,
  content: React.PropTypes.string.isRequired,
  fs: React.PropTypes.object.isRequired,
  components: React.PropTypes.object,
};
