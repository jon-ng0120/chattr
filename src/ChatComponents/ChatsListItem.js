import React, { useState, useContext, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import FirebaseContext from '../store/firebase-context';

const ChatsListItem = ({ id, members, lastMessage }) => {
  const [chatMember, setChatMember] = useState();

  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser, db } = firebaseProviderCtx;

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
      <div>
        <img src={chatMember.photoURL} referrerPolicy="no-referrer" />
        <p>{chatMember.displayName}</p>
        <p>{lastMessage}</p>
      </div>
    );
  }
};

export default ChatsListItem;
