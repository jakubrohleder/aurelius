import React from 'react';

import Button from 'components/Button';
import ButtonImage from 'components/ButtonImage';
import FSBrowser from 'components/FSBrowser';
import ButtonZip from 'components/ButtonZip';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

export default class Footer extends React.Component {
  state = {
    showFs: false,
  }

  componentWillReceiveProps(nextProps) {
    const nextLength = Object.keys(nextProps.fs).length;
    const length = Object.keys(this.props.fs).length;

    if (nextLength !== length && nextLength === 0) {
      this.setState({
        showFs: false,
      });
    }
  }

  handleToggleFs = () => {
    const showFs = !this.state.showFs;
    this.setState({ showFs });
  }

  render() {
    const {
      fs, wordCount,
      onAddImage, onDownload, onRemoveImage, onEditImage, onStartNew, onUploadZip,
    } = this.props;
    const { showFs } = this.state;
    const filesCount = Object.keys(fs).length;
    const footerClass = cx('footer', { showFs });

    return (
      <div className={footerClass}>
        <div className={styles.footerButtons}>
          <div className={styles.footerButtonsLeft}>
            <Button onClick={this.handleToggleFs}>{showFs ? 'Hide' : 'Show'} FS</Button>
            <ButtonImage onChange={(name, src) => onAddImage(name, src, 'img')} />
          </div>
          <div className={styles.footerButtonsCenter}>
            <span>{filesCount} file{filesCount !== 1 && 's'}</span>
            <span>{wordCount} word{wordCount !== 1 && 's'}</span>
          </div>
          <div className={styles.footerButtonsRight}>
            <Button onClick={onStartNew}>Start new</Button>
            <ButtonZip onChange={onUploadZip}>From zip</ButtonZip>
            <Button onClick={onDownload}>Download</Button>
          </div>
        </div>
        <div
          className={styles.browser}
        >
          <FSBrowser
            fs={fs}
            onRemove={onRemoveImage}
            onEdit={onEditImage}
          />
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  fs: React.PropTypes.object.isRequired,
  wordCount: React.PropTypes.number.isRequired,
  onUploadZip: React.PropTypes.func.isRequired,
  onAddImage: React.PropTypes.func.isRequired,
  onDownload: React.PropTypes.func.isRequired,
  onRemoveImage: React.PropTypes.func.isRequired,
  onEditImage: React.PropTypes.func.isRequired,
  onStartNew: React.PropTypes.func.isRequired,
};
