import React, { useState, useEffect } from 'react';
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore';
import { auth, db } from '../firebase-config';
import ChatsListItem from './ChatsListItem';

const ChatsList = () => {
  const [chatsList, setChatsList] = useState([]);
  const [snapShot, setSnapShot] = useState();
  const { uid } = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'users'), where('uid', '==', uid));
    onSnapshot(q, (snapshot) => {
      setSnapShot(snapshot);
    });
  }, []);

  useEffect(() => {
    const getCurrentUserChats = async () => {
      const currentUserRef = doc(db, 'users', uid);
      const currentUserSnap = await getDoc(currentUserRef);
      const currentUserChats = currentUserSnap.data().chats;

      const currentUserChatDocs = await Promise.all(
        currentUserChats.map(async (chat) => {
          const chatRef = doc(db, 'chatrooms', chat);
          const chatDoc = await getDoc(chatRef);
          return chatDoc.data();
        })
      );

      setChatsList(currentUserChatDocs);
    };
    getCurrentUserChats();
  }, [snapShot]);

  return (
    <div>
      {chatsList.map((chat) => {
        return (
          <ChatsListItem
            key={chat.id}
            users={chat.users}
            messages={chat.messages}
          />
        );
      })}
    </div>
  );
};

export default ChatsList;
