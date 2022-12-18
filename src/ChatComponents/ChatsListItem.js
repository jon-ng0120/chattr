import React, { useState, useContext, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import classes from './ChatsListItem.module.css';

import FirebaseContext from '../store/firebase-context';

const ChatsListItem = ({ members, lastMessage }) => {
  const [chatMember, setChatMember] = useState();

  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser, db, setActiveChat, checkMobileView, darkMode } =
    firebaseProviderCtx;

  const setChatMemberHandler = async (members) => {
    const filterChatMember = members.filter(
      (member) => member !== loggedInUser.uid
    );
    getChatMemberDetails(filterChatMember[0]);
  };

  const getChatMemberDetails = async (userID) => {
    const userRef = doc(db, 'users', userID);
    const userSnap = await getDoc(userRef);
    setChatMember(userSnap.data());
  };

  useEffect(() => {
    setChatMemberHandler(members);
  }, []);

  if (chatMember) {
    return (
      <div
        className={`${classes.chat_list_item_container} ${
          darkMode || classes.light
        }`}
        onClick={() => {
          setActiveChat(chatMember);
          checkMobileView();
        }}
      >
        <img src={chatMember.photoURL} referrerPolicy="no-referrer" />
        <div className={classes.chat_details}>
          <p className={classes.display_name}>{chatMember.displayName}</p>
          <p className={classes.last_message}>{lastMessage}</p>
        </div>
      </div>
    );
  }
};

export default ChatsListItem;
