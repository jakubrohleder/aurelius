/**
*
* Button
*
*/

import React from 'react';

// import { FormattedMessage } from 'react-intl';
// import messages from './messages';
import classNames from 'classnames';

import styles from './styles.css';

export default function Button(props) {
  const { children, className, ...rest } = props;

  return (
    <button {...rest} className={classNames(styles.wrapper, className)}>
      {children}
    </button>
  );
}

Button.propTypes = {
  children: React.PropTypes.node.isRequired,
  className: React.PropTypes.string,
};
