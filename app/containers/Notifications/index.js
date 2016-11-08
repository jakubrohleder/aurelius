import React from 'react';
import { connect } from 'react-redux';

import styles from './styles.css';

function Notifications(props) {
  const { notifications } = props;

  return (
    <ul className={styles.wrapper}>
      {notifications.toJS().map(
        (notification) => (
          <li key={notification.id} className={styles.notification}>
            {notification.text}
          </li>
        )
      )}
    </ul>
  );
}

Notifications.propTypes = {
  notifications: React.PropTypes.object.isRequired,
};

export default connect(
  (state) => ({
    notifications: state.get('notifications'),
  })
)(Notifications);
