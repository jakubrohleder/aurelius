/**
*
* ButtonImage
*
*/

import React from 'react';

import styles from './styles.css';

export default class InputUpload extends React.Component {
  componentWillMount() {
    this.name = Math.random().toString();
  }

  handleImageChange = (event) => {
    const { onChange } = this.props;
    const files = event.target.files;

    onChange(files);
  }

  render() {
    const { children, ...rest } = this.props;

    return (
      <label className={styles.wrapper} htmlFor={this.name}>
        <input
          {...rest}
          type="file"
          name={`${this.name}[]`}
          id={this.name}
          className={styles.input}
          onChange={this.handleImageChange}
          value={''}
          multiple
        />
        {children}
      </label>
    );
  }
}

InputUpload.propTypes = {
  children: React.PropTypes.node.isRequired,
  onChange: React.PropTypes.func.isRequired,
};
