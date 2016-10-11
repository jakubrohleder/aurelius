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
import styles from './styles.css';
import initialContent from 'raw!./index.md';

function Frame(props) {
  const { color, children } = props;

  return (
    <div style={{ border: `1px solid ${color}` }}>
      {children}
    </div>
  );
}

Frame.propTypes = {
  color: React.PropTypes.string,
  children: React.PropTypes.node,
};

function Square(props) {
  const { color } = props;

  return (
    <div style={{ width: '30vw', height: '30vw', background: color }} />
  );
}

Square.propTypes = {
  color: React.PropTypes.string,
};

const components = { Square, Frame };

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
          <EditorPreview content={content} components={components} />
        </div>
      </div>
    );
  }
}
