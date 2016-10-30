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
import frontMatter from 'front-matter';
import markdownToReactComponent from 'utils/markdownToReactComponent';

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
    meta: React.PropTypes.object.isRequired,
    fs: React.PropTypes.object.isRequired,
  }

  state = {
    showFs: true,
    showMenu: true,
    focus: 'initial',
    previousFocus: 'initial',
  }

  handleChangeContent = (content) => {
    this.props.updateState({
      content,
    });
  }

  handleChangeMeta = (name, value) => {
    const { meta } = this.props;

    this.props.updateState({
      meta: {
        ...meta,
        [name]: value,
      },
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
    const { content, meta, fs } = this.props;

    packToZip(content, meta, fs);
  }

  handleHideModal = () => {
    this.setState({
      showMenu: false,
    });
  }

  handleUploadZip = (zip) => {
    const { updateState } = this.props;

    Object.values(zip.files).forEach((file) => {
      if (file.dir) return;
      if (file.name.startsWith('__MACOSX')) return;
      if (file.name.endsWith('.md')) {
        file.async('string').then((content) => {
          const meta = frontMatter(content);

          updateState({
            content: meta.body,
            meta: meta.attributes,
          });

          this.setState({
            showMenu: false,
          });
        });
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
    if (focus === 'initial' && direction === 'center') return;

    if (focus === direction) this.setState({ focus: 'center', previousFocus: focus });
    else this.setState({ focus: direction, previousFocus: focus });
  }

  handleStartNew = () => {
    this.handleHideModal();
    this.props.updateState({
      meta: {},
      content: '',
    });
  }

  render() {
    const { content, meta, fs } = this.props;
    const { focus, previousFocus, showMenu } = this.state;

    const contentClass = cx('content', focus, styles[`from${previousFocus}`]);
    const components = Typography;
    const { node, wordCount } = markdownToReactComponent(content, components, fs);

    return (
      <div className={styles.wrapper}>
        {showMenu &&
          <div className={styles.modal}>
            <Button onClick={this.handleStartNew}>New Document</Button>
            <Button onClick={this.handleHideModal}>Continue</Button>
            <ButtonZip onChange={this.handleUploadZip}>From zip</ButtonZip>
          </div>
        }

        <Header
          focus={focus}
          handleFocus={this.handleFocus}
        />

        <div className={contentClass}>
          <div className={cx('contentElement', 'contentElementLeft')}>
            <div className={styles.contentWrapper}>
              <EditorInput
                content={content}
                meta={meta}
                onChangeContent={this.handleChangeContent}
                onChangeMeta={this.handleChangeMeta}
                onChangeImage={this.handleAddImage}
                metaInputs={metaInputs}
              />
            </div>
          </div>
          <div className={cx('contentElement', 'contentElementRight')}>
            <div className={styles.contentWrapper}>
              <EditorPreview
                node={node}
                meta={meta}
                fs={fs}
                wrapper={PostWrapper}
              />
            </div>
          </div>
        </div>

        <Footer
          fs={fs}
          wordCount={wordCount}
          onStartNew={this.handleStartNew}
          onAddImage={this.handleAddImage}
          onRemoveImage={this.handleRemoveImage}
          onEditImage={this.handleEditImage}
          onDownload={this.handleDownload}
          onUploadZip={this.handleUploadZip}
        />
      </div>
    );
  }
}

export default ComponentStore(
  () => ({
    content: initialContent,
    meta: {
      title: 'test',
    },
    fs: {
    },
  })
)(HomePage);
