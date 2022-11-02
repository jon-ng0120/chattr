import React, { useContext, useRef } from 'react';
import classes from './SendMessage.module.css';
import { setDoc, doc } from 'firebase/firestore';
import FirebaseContext from '../store/firebase-context';

const SendMessage = () => {
  const messageRef = useRef('');

  const firebaseProviderCtx = useContext(FirebaseContext);

  const { loggedInUser } = firebaseProviderCtx;
  const { activeChatUser } = firebaseProviderCtx;

  const sendMessage = async (e) => {
    e.preventDefault();

    const message = messageRef.current.value;

    if (message === '') return;

    const joinedIDs = [loggedInUser.uid, activeChatUser.uid].sort().join('');

    try {
      await setDoc(doc(firebaseProviderCtx.db, 'chatrooms', joinedIDs), {
        id: joinedIDs,
        createdBy: loggedInUser.uid,
        lastMessage: message,
      });
    } catch (err) {
      console.log(err);
    }
    messageRef.current.value = '';
  };

  return (
    <div className={classes.user_input_container}>
      <p className={classes.attachments}>+</p>
      <form className={classes.user_input}>
        <input ref={messageRef} placeholder="Type a message" />
        <button className="material-icons" onClick={sendMessage}>
          send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
