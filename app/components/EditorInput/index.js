import React from 'react';
import styles from './styles.css';
import Codemirror from 'codemirror';
import frontMatter from 'front-matter';
import objectToFrontMatter from 'utils/objectToFrontMatter';
import Button from 'components/Button';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';


export default class EditorInput extends React.Component {
  state = {
    raw: false,
  }

  componentDidMount() {
    const { onChange } = this.props;

    const options = {
      ...this.props.options,
      mode: 'markdown',
      lineNumbers: false,
      lineWrapping: true,
      indentWithTabs: true,
      tabSize: '2',
    };

    const formatDoc = (doc) => {
      const { raw } = this.state;
      if (this.stateChange) {
        this.stateChange = false;
        return !raw ? doc : this.addMeta(doc);
      }
      return raw ? doc : this.addMeta(doc);
    };

    this.codeMirror = Codemirror.fromTextArea(this.textarea, options);
    this.codeMirror.on('change', (doc) => onChange(formatDoc(doc.getValue())));

    setInterval(() => {
      this.codeMirror.refresh();
    });
  }

  componentWillUpdate(nextProps, nextState) {
    if (this.state.raw !== nextState.raw) {
      const value = nextState.raw ? nextProps.content : frontMatter(nextProps.content).body;
      this.stateChange = true;
      this.codeMirror.getDoc().setValue(value);
    }
  }

  onMetaChange = (key, value) => {
    const { onChange } = this.props;

    onChange(this.addContent(key, value));
  }

  addMeta = (newContent) => {
    const { content } = this.props;

    const meta = frontMatter(content);
    const result = `---\n${meta.frontmatter}\n---\n${newContent}`;

    return result;
  }

  addContent = (key, value) => {
    const { content } = this.props;

    const meta = frontMatter(content);
    const newFrontMatter = {
      ...meta.attributes,
      [key]: value,
    };

    const result = `---\n${objectToFrontMatter(newFrontMatter)}\n---\n${meta.body}`;

    return result;
  }

  toggleRaw = () => {
    const { raw } = this.state;
    this.setState({
      raw: !raw,
    });
  }

  render() {
    const { content, metaInputs, onChangeImage } = this.props;
    const { raw } = this.state;

    const meta = frontMatter(content);

    const text = raw ? content : meta.body;

    return (
      <div className={styles.wrapper}>
        <Button onClick={this.toggleRaw}>Raw</Button>
        {!raw &&
          <div className={styles.meta}>
            {metaInputs.map(
              ({ Component, name }, index) =>
                <div key={index}>
                  <p>{name}</p>
                  <Component
                    meta={meta.attributes}
                    onChange={this.onMetaChange}
                    onChangeImage={onChangeImage}
                  />
                </div>
            )}
          </div>
        }
        <div className={styles.textarea}>
          <textarea
            defaultValue={text}
            ref={(textarea) => { this.textarea = textarea; }}
          />
        </div>
      </div>
    );
  }
}

EditorInput.propTypes = {
  content: React.PropTypes.string.isRequired,
  onChange: React.PropTypes.func.isRequired,
  onChangeImage: React.PropTypes.func.isRequired,
  options: React.PropTypes.object.isRequired,
  metaInputs: React.PropTypes.array.isRequired,
};

EditorInput.defaultProps = {
  options: {},
  metaInputs: [],
};
