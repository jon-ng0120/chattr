import React, { useRef } from 'react';
import {
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
  arrayUnion,
  getDoc,
} from 'firebase/firestore';
import { chatRoomsCol, db } from '../firebase-config';
import { auth } from '../firebase-config';
import classes from './UserInput.module.css';

const SendMessage = ({ chatUser }) => {
  const messageRef = useRef('');

  const { uid, displayName, photoURL } = auth.currentUser;

  const sendMessage = async (e) => {
    const message = messageRef.current.value;
    e.preventDefault();

    const joinedIDs = [chatUser.uid, uid].sort().join('');
    const chatRef = doc(db, 'chatrooms', joinedIDs);
    const chatSnap = await getDoc(chatRef);

    if (!chatSnap.exists()) {
      await setDoc(doc(chatRoomsCol, `${chatUser.uid}${uid}`), {
        createdAt: serverTimestamp(),
        lastUpdated: serverTimestamp(),
        users: [
          {
            uid,
            displayName,
            photoURL,
          },
          {
            uid: chatUser.uid,
            displayName: chatUser.displayName,
            photoURL: chatUser.photoURL,
          },
        ],
      });
    }

    await updateDoc(chatRef, {
      lastUpdated: serverTimestamp(),
      messages: arrayUnion({
        id: uid + new Date().getTime(),
        uid,
        photoURL,
        displayName,
        message,
      }),
    });
    messageRef.current.value = '';
  };

  return (
    <div className={classes.user_input_container}>
      <p className={classes.attachments}>+</p>
      <form className={classes.user_input}>
        <input ref={messageRef} placeholder="Type a message" />
        <button onClick={sendMessage} className="material-icons">
          send
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
