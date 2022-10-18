import React from 'react';
import classes from './Message.module.css';
import { auth } from '../firebase-config';

const Message = ({ uid, message, photoURL }) => {
  const currentUser = auth.currentUser;
  return (
    <div className={classes.message_container}>
      <img className={classes.display_picture} src={photoURL} />
      <p
        className={`${classes.message} ${
          uid === currentUser.uid ? classes.sent : classes.received
        }`}
      >
        {message}
      </p>
    </div>
  );
};

export default Message;
