import React from 'react';
import parseMarkdown from 'utils/parseMarkdown';
import styles from './styles.css';

export default function EditorPreview(props) {
  const { content, components } = props;
  const { node, meta } = parseMarkdown(content, components);

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
  components: React.PropTypes.object,
};
