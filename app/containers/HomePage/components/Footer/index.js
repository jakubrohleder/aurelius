import React from 'react';

import Button from 'components/Button';
import ButtonImage from 'components/ButtonImage';
import FSBrowser from 'components/FSBrowser';
import classNames from 'classnames/bind';

import styles from './styles.css';

const cx = classNames.bind(styles);

export default class Footer extends React.Component {
  state = {
    showFs: false,
  }

  handleToggleFs = () => {
    const showFs = !this.state.showFs;
    this.setState({ showFs });
  }

  render() {
    const {
      fs, wordCount,
      handleAddImage, handleDownload, handleRemoveImage, handleEditImage,
    } = this.props;
    const { showFs } = this.state;
    const filesCount = Object.keys(fs).length;
    const footerClass = cx('footer', { showFs });

    return (
      <div className={footerClass}>
        <div className={styles.footerButtons}>
          <div className={styles.footerButtonsLeft}>
            <Button disabled={!filesCount} onClick={this.handleToggleFs}>{showFs ? 'Hide' : 'Show'} FS</Button>
            <ButtonImage onChange={(name, src) => handleAddImage(name, src, 'img')} />
          </div>
          <div className={styles.footerButtonsCenter}>
            <span>{filesCount} file{filesCount !== 1 && 's'}</span>
            <span>{wordCount} word{wordCount !== 1 && 's'}</span>
          </div>
          <div className={styles.footerButtonsRight}>
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </div>
        <div
          className={styles.browser}
        >
          <FSBrowser
            fs={fs}
            onRemove={handleRemoveImage}
            onEdit={handleEditImage}
          />
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  fs: React.PropTypes.object.isRequired,
  wordCount: React.PropTypes.number.isRequired,
  handleAddImage: React.PropTypes.func.isRequired,
  handleDownload: React.PropTypes.func.isRequired,
  handleRemoveImage: React.PropTypes.func.isRequired,
  handleEditImage: React.PropTypes.func.isRequired,
};
