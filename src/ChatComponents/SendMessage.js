import React, { useContext, useRef } from 'react';
import classes from './SendMessage.module.css';
import {
  setDoc,
  doc,
  updateDoc,
  collection,
  serverTimestamp,
  arrayUnion,
} from 'firebase/firestore';
import FirebaseContext from '../store/firebase-context';

const SendMessage = () => {
  const messageRef = useRef('');

  const firebaseProviderCtx = useContext(FirebaseContext);

  const { loggedInUser, activeChatUser, db } = firebaseProviderCtx;

  let joinedIDs = undefined;

  if (activeChatUser) {
    joinedIDs = [loggedInUser.uid, activeChatUser.uid].sort().join('');
  }

  const sendMessage = async (e) => {
    e.preventDefault();

    const message = messageRef.current.value;

    if (message === '') return;

    try {
      const messagesRef = doc(collection(db, 'messages'));
      await setDoc(messagesRef, {
        id: messagesRef.id,
        chatRoomId: joinedIDs,
        message: message,
        uid: loggedInUser.uid,
        sentAt: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }

    try {
      await setDoc(doc(firebaseProviderCtx.db, 'chatrooms', joinedIDs), {
        id: joinedIDs,
        createdBy: loggedInUser.uid,
        lastMessage: message,
        members: [loggedInUser.uid, activeChatUser.uid],
      });
    } catch (err) {
      console.log(err);
    }

    try {
      addToUserGroups();
    } catch (err) {
      console.log(err);
    }
    messageRef.current.value = '';
  };

  const addToUserGroups = async () => {
    const loggedInUserRef = doc(db, 'users', loggedInUser.uid);
    await updateDoc(loggedInUserRef, {
      chatRooms: arrayUnion(joinedIDs),
    });
    const chatUserRef = doc(db, 'users', activeChatUser.uid);
    await updateDoc(chatUserRef, {
      chatRooms: arrayUnion(joinedIDs),
    });
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
