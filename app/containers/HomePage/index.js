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

import styles from './styles.css';
import Footer from './components/Footer';
// import initialContent from 'raw!./md/components.md';
// import initialContent from 'raw!./md/markdown.md';

const metaInputs = [
  {
    Component: (props) => <MetaInputText {...props} name="title" />,
    name: 'Title',
  },
  {
    Component: (props) => <MetaInputText {...props} name="author" />,
    name: 'Author',
  },
  {
    Component: (props) => <MetaInputDateTime {...props} name="date" />,
    name: 'Date',
  },
  {
    Component: (props) => <MetaInputImage {...props} name="cover" />,
    name: 'Cover',
  },
  {
    Component: (props) => <MetaInputImage {...props} name="photo" />,
    name: 'Photo',
  },
  {
    Component: (props) => <MetaInputText {...props} name="path" />,
    name: 'Path',
  },
  {
    Component: (props) => <MetaInputText {...props} name="readNext" />,
    name: 'Read next',
  },
];

class HomePage extends React.Component {
  static propTypes = {
    updateState: React.PropTypes.func.isRequired,
    content: React.PropTypes.string,
    fs: React.PropTypes.object.isRequired,
  }

  state = {
    showFs: true,
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
    console.log(zip);
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

  render() {
    const { content, fs } = this.props;

    if (content == null) {
      return (
        <div>
          <Button onClick={() => this.handleChangeText('')}>New</Button>
          <ButtonZip onChange={this.handleUploadZip} />
        </div>
      );
    }

    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <EditorInput
            content={content}
            onChange={this.handleChangeText}
            onChangeImage={this.handleAddImage}
            metaInputs={metaInputs}
          />
          <EditorPreview content={content} fs={fs} components={Typography} wrapper={PostWrapper} />
        </div>

        <Footer
          fs={fs}
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
    // content: initialContent,
    fs: {
    },
  })
)(HomePage);
