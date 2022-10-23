import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config';

const ChatsList = () => {
  const { uid } = auth.currentUser;

  const getCurrentUserChats = async () => {
    try {
      const currentUserRef = doc(db, 'users', uid);
      const currentUserSnap = await getDoc(currentUserRef);
      const currentUserChats = currentUserSnap.data().chats;
      createChatListItems(currentUserChats);
    } catch (error) {
      return error;
    }
  };

  const createChatListItems = (chats) => {};

  return <div>ChatsList</div>;
};

export default ChatsList;
