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
import PostWrapper from 'components/PostWrapper';
import EditorInput from 'components/EditorInput';
import EditorPreview from 'components/EditorPreview';
import Button from 'components/Button';
import ButtonZip from 'components/ButtonZip';
import * as Typography from 'components/Typography';
import ComponentStore from 'hocs/ComponentStore';
import packToZip from 'utils/packToZip';
import MetaInputText from 'components/MetaInputs/Text';
import MetaInputDateTime from 'components/MetaInputs/DateTime';
import MetaInputImage from 'components/MetaInputs/Image';
import classNames from 'classnames/bind';

import styles from './styles.css';
import Footer from './components/Footer';
import Header from './components/Header';
// import initialContent from 'raw!./md/components.md';
import initialContent from 'raw!./md/markdown.md';

const cx = classNames.bind(styles);

const metaInputs = [
  (props) => <MetaInputText {...props} name="title" />,
  (props) => <MetaInputText {...props} name="author" />,
  (props) => <MetaInputDateTime {...props} name="date" />,
  (props) => <MetaInputImage {...props} name="cover" />,
  (props) => <MetaInputImage {...props} name="photo" />,
  (props) => <MetaInputText {...props} name="path" />,
  (props) => <MetaInputText {...props} name="readNext" />,
];

class HomePage extends React.Component {
  static propTypes = {
    updateState: React.PropTypes.func.isRequired,
    content: React.PropTypes.string,
    fs: React.PropTypes.object.isRequired,
  }

  state = {
    showFs: true,
    focus: 'center',
  }

  handleChangeText = (content) => {
    this.props.updateState({
      content,
    });
  }

  handleAddImage = (name, src, dir) => {
    const { fs, updateState } = this.props;
    const path = dir ? `${dir}/${name}` : name;

    updateState({
      fs: {
        ...fs,
        [path]: src,
      },
    });
  }

  handleRemoveImage = (name) => {
    const { fs, updateState } = this.props;
    const { [name]: oldFile, ...newFs } = fs; // eslint-disable-line no-unused-vars

    updateState({
      fs: newFs,
    });
  }

  handleEditImage = (oldName, newName) => {
    const { fs, updateState } = this.props;
    const { [oldName]: src, ...newFs } = fs;
    newFs[newName] = src;

    updateState({
      fs: newFs,
    });
  }

  handleDownload = () => {
    const { content, fs } = this.props;

    packToZip(content, fs);
  }

  handleUploadZip = (zip) => {
    Object.values(zip.files).forEach((file) => {
      if (file.dir) return;
      if (file.name.startsWith('__MACOSX')) return;
      if (file.name.endsWith('.md')) {
        file.async('string').then(this.handleChangeText);
      }

      if (file.name.endsWith('.jpg')) {
        file.async('uint8array').then((buffer) => {
          const path = URL.createObjectURL(new Blob([buffer], { type: 'image/jpg' }));
          this.handleAddImage(file.name, path);
        });
      }
    });
  }

  handleFocus = (direction) => () => {
    const { focus } = this.state;

    if (focus === direction) this.setState({ focus: 'center' });
    else this.setState({ focus: direction });
  }

  render() {
    const { content, fs } = this.props;
    const { focus } = this.state;

    if (content == null) {
      return (
        <div>
          <Button onClick={() => this.handleChangeText('')}>New</Button>
          <ButtonZip onChange={this.handleUploadZip} />
        </div>
      );
    }

    const contentClass = cx('content', focus);

    return (
      <div className={styles.wrapper}>
        <Header
          focus={focus}
          handleFocus={this.handleFocus}
        />

        <div className={contentClass}>
          <div className={styles.contentElement}>
            <EditorInput
              content={content}
              onChange={this.handleChangeText}
              onChangeImage={this.handleAddImage}
              metaInputs={metaInputs}
            />
          </div>
          <div className={styles.contentElement}>
            <EditorPreview content={content} fs={fs} components={Typography} wrapper={PostWrapper} />
          </div>
        </div>

        <Footer
          fs={fs}
          content={content}
          handleAddImage={this.handleAddImage}
          handleRemoveImage={this.handleRemoveImage}
          handleEditImage={this.handleEditImage}
          handleDownload={this.handleDownload}
        />
      </div>
    );
  }
}

export default ComponentStore(
  () => ({
    content: initialContent,
    fs: {
    },
  })
)(HomePage);
