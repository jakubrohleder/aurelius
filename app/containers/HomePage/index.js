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
import EditorInput from 'components/EditorInput';
import EditorPreview from 'components/EditorPreview';
import * as Typography from 'components/Typography';
import styles from './styles.css';
import initialContent from 'raw!./index.md';

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  state = {
    content: initialContent,
  };

  handleChange = (event) => {
    this.setState({ content: event.target.value });
  }

  render() {
    const { content } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.content}>
          <EditorInput content={content} handleChange={this.handleChange} />
          <EditorPreview content={content} components={Typography} />
        </div>
      </div>
    );
  }
}
