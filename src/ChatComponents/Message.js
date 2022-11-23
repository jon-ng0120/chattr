import React from 'react';
import classes from './Message.module.css';
import { auth } from '../firebase-config';

const Message = ({ uid, message, displayName, photoURL }) => {
  const currentUser = auth.currentUser;
  return (
    <div
      className={`${classes.message_container} ${
        uid === currentUser.uid ? classes.sent : classes.received
      }`}
    >
      <img
        className={`${classes.display_picture} ${
          uid === currentUser.uid ? classes.display_picture_sent : ''
        } `}
        src={photoURL}
        referrerPolicy="no-referrer"
      />
      <div className={classes.message_details}>
        <p
          className={` ${classes.display_name} ${
            uid === currentUser.uid
              ? classes.display_name_sent
              : classes.display_name_recieved
          } `}
        >
          {uid === currentUser.uid ? 'Me' : displayName}
        </p>
        <p
          className={`${classes.message} ${
            uid === currentUser.uid
              ? classes.sent_message
              : classes.received_message
          } `}
        >
          {message}
        </p>
      </div>
    </div>
  );
};

export default Message;
