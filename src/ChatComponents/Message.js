import React, { useContext } from 'react';
import classes from './Message.module.css';
import FirebaseContext from '../store/firebase-context';

const Message = ({ uid, message, displayName, photoURL, timestamp }) => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { auth, darkMode } = firebaseProviderCtx;
  const currentUser = auth.currentUser;

  const returnDateTime = () => {
    if (timestamp) {
      const messageDate = timestamp.toDate().toDateString();
      const messageDateFormatted = messageDate.split(' ').splice(1).join(' ');
      const messageTimeFormatted = timestamp
        .toDate()
        .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      return `${messageDateFormatted}, ${messageTimeFormatted}`;
    }
  };

  return (
    <div
      className={`${classes.message_container} ${
        uid === currentUser.uid ? classes.sent : classes.received
      } ${darkMode || classes.light}`}
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
          }`}
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
        <p className={classes.message_date}>{returnDateTime()}</p>
      </div>
    </div>
  );
};

export default Message;
