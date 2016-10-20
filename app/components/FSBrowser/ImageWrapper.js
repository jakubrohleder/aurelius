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
    const { path, onEdit, onRemove } = this.props;
    const { value } = this.state;

    return (
      <div className={styles.photoWrapper}>
        <input value={value} onChange={this.handleChange} onBlur={() => onEdit(value)} />
        <img src={path} role="presentation" />
        <Button onClick={onRemove}>Remove</Button>
      </div>
    );
  }
}

ImageWrapper.propTypes = {
  name: React.PropTypes.string.isRequired,
  path: React.PropTypes.string.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
};
