import React from 'react';
import styles from './styles.css';
import Codemirror from 'codemirror';
// import Button from 'components/Button';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';


export default class EditorInput extends React.Component {
  componentDidMount() {
    const { onChangeContent } = this.props;

    const options = {
      ...this.props.options,
      mode: 'markdown',
      lineNumbers: false,
      lineWrapping: true,
      indentWithTabs: true,
      tabSize: '2',
    };

    this.codeMirror = Codemirror.fromTextArea(this.textarea, options);
    this.codeMirror.on('change', (doc) => onChangeContent(doc.getValue()));

    setTimeout(() => {
      this.codeMirror.refresh();
    });
  }

  render() {
    const { content, meta, metaInputs, onChangeImage, onChangeMeta } = this.props;

    return (
      <div className={styles.wrapper}>
        {
          // <Button onClick={this.toggleRaw}>Raw</Button>
        }
        <div className={styles.meta}>
          {metaInputs.map(
            (Component, index) =>
              <div
                key={index}
                className={styles.metaInput}
              >
                <Component
                  meta={meta}
                  onChange={onChangeMeta}
                  onChangeImage={onChangeImage}
                />
              </div>
          )}
        </div>
        <div className={styles.textarea}>
          <textarea
            defaultValue={content}
            ref={(textarea) => { this.textarea = textarea; }}
          />
        </div>
      </div>
    );
  }
}

EditorInput.propTypes = {
  content: React.PropTypes.string.isRequired,
  meta: React.PropTypes.object.isRequired,
  onChangeContent: React.PropTypes.func.isRequired,
  onChangeMeta: React.PropTypes.func.isRequired,
  onChangeImage: React.PropTypes.func.isRequired,
  options: React.PropTypes.object.isRequired,
  metaInputs: React.PropTypes.array.isRequired,
};

EditorInput.defaultProps = {
  options: {},
  metaInputs: [],
};
