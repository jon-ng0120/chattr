import React, { useContext, useEffect, useState } from 'react';
import {
  doc,
  getDoc,
  query,
  onSnapshot,
  collection,
  where,
  getDocs,
} from 'firebase/firestore';
import FirebaseContext from '../store/firebase-context';
import ChatsListItem from './ChatsListItem';

const ChatsList = () => {
  const [chatsList, setChatsList] = useState([]);
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser, db } = firebaseProviderCtx;

  useEffect(() => {
    const getCurrentUser = async () => {
      const chatRoomsRef = collection(db, 'chatrooms');
      const q = query(
        chatRoomsRef,
        where('members', 'array-contains', loggedInUser.uid)
      );
      onSnapshot(q, (querySnapshop) => {
        const chatRoomDocs = [];
        querySnapshop.forEach((doc) => {
          chatRoomDocs.push(doc.data());
        });
        setChatsList(chatRoomDocs);
      });
    };

    getCurrentUser();
  }, []);

  return (
    <div>
      {chatsList.map((chatRoom) => (
        <ChatsListItem
          key={chatRoom.id}
          id={chatRoom.id}
          lastMessage={chatRoom.lastMessage}
          members={chatRoom.members}
        />
      ))}
    </div>
  );
};

export default ChatsList;
