import React from 'react';
import styles from './styles.css';
import Codemirror from 'codemirror';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';

export default class EditorInput extends React.Component {
  componentDidMount() {
    const { handleChange } = this.props;
    const options = {
      ...this.props.options,
      mode: 'markdown',
      lineNumbers: false,
      lineWrapping: true,
      indentWithTabs: true,
      tabSize: '2',
    };

    this.codeMirror = Codemirror.fromTextArea(this.textarea, options);
    this.codeMirror.on('change', (doc) => handleChange(doc.getValue()));

    setInterval(() => {
      this.codeMirror.refresh();
    });
  }

  render() {
    const { content } = this.props;

    return (
      <div className={styles.wrapper}>
        <textarea
          className={styles.textarea}
          defaultValue={content}
          ref={(textarea) => { this.textarea = textarea; }}
        />
      </div>
    );
  }
}

EditorInput.propTypes = {
  content: React.PropTypes.string.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  options: React.PropTypes.object.isRequired,
};

EditorInput.defaultProps = {
  options: {},
};
