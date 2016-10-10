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
// import { FormattedMessage } from 'react-intl';
// import messages from './messages';

import file from 'raw!./file.md';
import fileLong from 'raw!./file-long.md';
import parseMarkdown from 'utils/parseMarkdown';

console.time('Short file');
const Node = parseMarkdown(file, { Frame });
console.timeEnd('Short file');

console.time('Long file');
const NodeLong = parseMarkdown(fileLong, { Frame });
console.timeEnd('Long file');


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

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <h1>
        {Node}
        {NodeLong}
      </h1>
    );
  }
}
