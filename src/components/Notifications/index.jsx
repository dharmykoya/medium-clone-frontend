import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

export const Notification = props => {
  const { notification, handleIsread } = props;
  return (
    <div className="tray-details">
      <p className="text-center font-weight-bolder text-dark pt-2 pb-2 mb-0 notify-title">
        {' '}
        Notifications{' '}
      </p>
      {notification
        ? notification.map((item, i) => {
            return (
              <Link
                to={item.link}
                onClick={e => handleIsread(e, item.id)}
                key={i}
                className={`notification-tray-item ${
                  item.isRead ? '' : 'unread'
                }`}
              >
                <p>{item.notificationMessage}</p>
                <span>{moment(item.createdAt).fromNow()}</span>
              </Link>
            );
          })
        : ''}
    </div>
  );
};

Notification.propTypes = {
  notification: PropTypes.array,
  handleIsread: PropTypes.func
};

export default Notification;
