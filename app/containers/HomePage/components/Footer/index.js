import React from 'react';

import Button from 'components/Button';
import ImageButton from 'components/ImageButton';
import FSBrowser from 'components/FSBrowser';

import styles from './styles.css';

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
      fs,
      handleAddImage, handleDownload, handleRemoveImage, handleEditImage,
    } = this.props;
    const { showFs } = this.state;

    return (
      <div className={styles.footer}>
        <div className={styles.footerButtons}>
          <div className={styles.footerButtonsLeft}>
            <Button onClick={this.handleToggleFs}>{showFs ? 'Hide' : 'Show'} FS</Button>
            <ImageButton onChange={handleAddImage} />
          </div>
          <div className={styles.footerButtonsRight}>
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </div>
        {showFs &&
          <FSBrowser
            fs={fs}
            onRemove={handleRemoveImage}
            onEdit={handleEditImage}
          />
        }
      </div>
    );
  }
}

Footer.propTypes = {
  fs: React.PropTypes.object.isRequired,
  handleAddImage: React.PropTypes.func.isRequired,
  handleDownload: React.PropTypes.func.isRequired,
  handleRemoveImage: React.PropTypes.func.isRequired,
  handleEditImage: React.PropTypes.func.isRequired,
};
