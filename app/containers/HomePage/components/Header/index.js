import React from 'react';
import classNames from 'classnames/bind';

import left from './left.svg';
import center from './center.svg';
import right from './right.svg';

import styles from './styles.css';

const cx = classNames.bind(styles);

export default function Header(props) {
  const {
    handleFocus,
    focus,
  } = props;

  const headerClass = cx('header', focus);

  return (
    <div className={headerClass}>
      <button className={styles.button} onClick={() => handleFocus('left')} >
        <img className={styles.icon} src={left} role="presentation" />
      </button>
      <button className={styles.button} href="" onClick={() => handleFocus('center')} >
        <img className={styles.icon} src={center} role="presentation" />
      </button>
      <button className={styles.button} href="" onClick={() => handleFocus('right')} >
        <img className={styles.icon} src={right} role="presentation" />
      </button>
    </div>
  );
}

Header.propTypes = {
  handleFocus: React.PropTypes.func.isRequired,
  focus: React.PropTypes.string,
};
