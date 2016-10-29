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
    const { value } = this.props;

    return (
      <label className={styles.wrapper} htmlFor={this.name}>
        <input
          type="file"
          name={`${this.name}[]`}
          id={this.name}
          className={styles.input}
          onChange={this.handleImageChange}
          value={''}
          multiple
        />
        <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
          <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
        </svg>
        {value || 'Add files...'}
      </label>
    );
  }
}

InputUpload.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  value: React.PropTypes.string,
};
