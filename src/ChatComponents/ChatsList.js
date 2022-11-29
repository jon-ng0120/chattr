import React, { useContext, useEffect, useState } from 'react';
import { query, onSnapshot, collection, where } from 'firebase/firestore';
import FirebaseContext from '../store/firebase-context';
import UserSearch from '../Search/UserSearch';
import ChatsListItem from './ChatsListItem';
import classes from './ChatsList.module.css';

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
      <div className={classes.chats_list_container}>
        <UserSearch />
        <div className={classes.chats_list_chats}>
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
    </div>
  );
};

export default ChatsList;
