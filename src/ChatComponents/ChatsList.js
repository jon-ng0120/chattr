import React, { useContext, useEffect, useState } from 'react';
import { query, onSnapshot, collection, where } from 'firebase/firestore';
import FirebaseContext from '../store/firebase-context';
import UserSearch from '../Search/UserSearch';
import ChatsListItem from './ChatsListItem';
import classes from './ChatsList.module.css';
import Header from '../Header/Header';

const ChatsList = () => {
  const [chatsList, setChatsList] = useState([]);
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser, db, darkMode } = firebaseProviderCtx;

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
    <div
      className={`${classes.chats_list_container} ${
        darkMode ? classes.dark : classes.light
      }`}
    >
      <Header />

      <div className={classes.chats_list_chats}>
        <UserSearch />
        {chatsList.map((chatRoom) => (
          <ChatsListItem
            key={chatRoom.id}
            id={chatRoom.id}
            lastMessage={chatRoom.lastMessage}
            members={chatRoom.members}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatsList;
