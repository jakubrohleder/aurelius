import React from 'react';
import parseMarkdown from 'utils/parseMarkdown';
import styles from './styles.css';

export default function EditorPreview(props) {
  const { content, components, fs } = props;
  const { node, meta } = parseMarkdown(content, components, fs);

  return (
    <div className={styles.wrapper}>
      {JSON.stringify(meta)}
      <hr />
      {node}
    </div>
  );
}

EditorPreview.propTypes = {
  content: React.PropTypes.string.isRequired,
  fs: React.PropTypes.object.isRequired,
  components: React.PropTypes.object,
};
