/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import EditorInput from 'components/EditorInput';
import EditorPreview from 'components/EditorPreview';
import InsertButton from 'components/InsertButton';
import * as Typography from 'components/Typography';
import styles from './styles.css';
import initialContent from 'raw!./index.md';
import ComponentStore from 'hocs/ComponentStore';
import packToZip from 'utils/packToZip';

class HomePage extends React.Component {
  static propTypes = {
    updateState: React.PropTypes.func.isRequired,
    content: React.PropTypes.string.isRequired,
    fs: React.PropTypes.object.isRequired,
  }

  handleChangeText = (content) => {
    this.props.updateState({
      content,
    });
  }

  handleChangeImage = ({ file, path }) => {
    const { fs } = this.props;

    this.props.updateState({
      fs: {
        ...fs,
        [file.name]: {
          file,
          path,
        },
      },
    });
  }

  handleDownload = () => {
    const { content, fs } = this.props;

    packToZip(content, fs);
  }

  render() {
    const { content, fs } = this.props;

    return (
      <div className={styles.wrapper}>
        <div className={styles.nav}>
          <InsertButton handleChange={this.handleChangeImage} />
          <button onClick={this.handleDownload}>Download</button>
        </div>
        <div className={styles.content}>
          <EditorInput content={content} handleChange={this.handleChangeText} />
          <EditorPreview content={content} fs={fs} components={Typography} />
        </div>
      </div>
    );
  }
}

export default ComponentStore(
  () => ({
    content: initialContent,
    fs: {},
  })
)(HomePage);
