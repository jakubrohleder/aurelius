import React from 'react';
import styles from './styles.css';

export default function EditorInput(props) {
  const { content, handleChange } = props;

  return (
    <div className={styles.wrapper}>
      <textarea
        className={styles.textarea}
        onChange={handleChange}
        value={content}
      />
    </div>
  );
}

EditorInput.propTypes = {
  content: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
};
