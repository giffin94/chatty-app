import React from 'react';
import PropTypes from 'prop-types';

function Notification(props) {
  const message = props.message;
  return (
    <div className='notificationTxt'>
      {message.content}
    </div>
  );
}
Notification.propTypes = {
  message: PropTypes.object,
}
export default Notification;