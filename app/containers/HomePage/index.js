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
import { connect } from 'react-redux';
import packToZip from 'utils/packToZip';
import MetaInputText from 'components/MetaInputs/Text';
import MetaInputDateTime from 'components/MetaInputs/DateTime';
import MetaInputImage from 'components/MetaInputs/Image';
import classNames from 'classnames/bind';
import markdownToReactComponent from 'utils/markdownToReactComponent';
import { actions } from './redux';
import { show as showNotificationAction } from 'containers/Notifications/redux';

import styles from './styles.css';
import Footer from './components/Footer';
import Header from './components/Header';

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
    ui: React.PropTypes.object.isRequired,
    editor: React.PropTypes.object.isRequired,
    fs: React.PropTypes.object.isRequired,
    loadDocumentFromZip: React.PropTypes.func.isRequired,
    setContent: React.PropTypes.func.isRequired,
    setMetaKey: React.PropTypes.func.isRequired,
    showNotification: React.PropTypes.func.isRequired,
    hideMenu: React.PropTypes.func.isRequired,
    resetDocument: React.PropTypes.func.isRequired,
    clearFileSystem: React.PropTypes.func.isRequired,
    changeFocus: React.PropTypes.func.isRequired,
    addFile: React.PropTypes.func.isRequired,
    removeFile: React.PropTypes.func.isRequired,
    moveFile: React.PropTypes.func.isRequired,
  }

  handleDownload = () => {
    const { editor, fs, showNotification } = this.props;

    const meta = editor.get('meta');
    const content = editor.get('content');

    packToZip(content, meta, fs)
      .catch((error) => showNotification(error, 2000))
    ;
  }

  handleStartNew = () => {
    const { hideMenu, resetDocument, clearFileSystem } = this.props;
    clearFileSystem();
    hideMenu();
    resetDocument();
  }

  handleLoadZip = (zip) => {
    const { hideMenu, loadDocumentFromZip, clearFileSystem } = this.props;
    clearFileSystem();
    hideMenu();
    loadDocumentFromZip(zip);
  }

  render() {
    const {
      ui, editor, fs,
      resetDocument, setContent, setMetaKey, hideMenu, changeFocus,
      addFile, removeFile, moveFile,
    } = this.props;

    const contentClass = cx('content', ui.get('focus'), styles[`from${ui.get('previousFocus')}`]);
    const components = Typography;
    const { node, wordCount } = markdownToReactComponent(editor.get('content'), components, fs);

    return (
      <div className={styles.wrapper}>
        {ui.get('showMenu') &&
          <div className={styles.modal}>
            <Button onClick={hideMenu}>Continue</Button>
            <Button onClick={this.handleStartNew}>New Document</Button>
            <ButtonZip onChange={this.handleLoadZip}>From zip</ButtonZip>
          </div>
        }

        <Header
          focus={ui.get('focus')}
          handleFocus={changeFocus}
        />

        <div className={contentClass}>
          <div className={cx('contentElement', 'contentElementLeft')}>
            <div className={styles.contentWrapper}>
              <EditorInput
                content={editor.get('content')}
                meta={editor.get('meta')}
                onChangeContent={setContent}
                onChangeMeta={setMetaKey}
                onChangeImage={addFile}
                metaInputs={metaInputs}
              />
            </div>
          </div>
          <div className={cx('contentElement', 'contentElementRight')}>
            <div className={styles.contentWrapper}>
              <EditorPreview
                node={node}
                meta={editor.get('meta')}
                fs={fs}
                wrapper={PostWrapper}
              />
            </div>
          </div>
        </div>

        <Footer
          fs={fs}
          wordCount={wordCount}
          onStartNew={resetDocument}
          onAddImage={addFile}
          onRemoveImage={removeFile}
          onEditImage={moveFile}
          onDownload={this.handleDownload}
          onUploadZip={this.handleLoadZip}
        />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    fs: state.getIn(['homePage', 'fs']),
    editor: state.getIn(['homePage', 'editor']),
    ui: state.getIn(['homePage', 'ui']),
  }),
  {
    ...actions,
    showNotification: showNotificationAction,
  },
)(HomePage);
