import React from 'react';

import Button from 'components/Button';
import styles from './styles.css';

export default class ImageWrapper extends React.Component {
  state = {
    value: '',
  }

  componentWillMount() {
    this.setState({
      value: this.props.name,
    });
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({ value });
  }

  render() {
    const { src, onEdit, onRemove } = this.props;
    const { value } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <input value={value} onChange={this.handleChange} onBlur={() => onEdit(value)} />
          <div className={styles.headerButtons}>
            <Button onClick={onRemove}>✕</Button>
          </div>
        </div>
        <img className={styles.image} src={src} role="presentation" />
      </div>
    );
  }
}

ImageWrapper.propTypes = {
  name: React.PropTypes.string.isRequired,
  src: React.PropTypes.string.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};
