import React from 'react';
import { auth } from '../firebase-config';

const ChatsListItem = ({ users, messages }) => {
  const { uid } = auth.currentUser;
  const chatUsers = users.filter((user) => user.uid !== uid);
  const lastMessage = messages[messages.length - 1].message;

  return (
    <div>
      <img src={chatUsers[0].photoURL} />
      <div>
        <p>{chatUsers[0].displayName}</p>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default ChatsListItem;
