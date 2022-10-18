import './App.css';
import React, { useState, useEffect } from 'react';
import LoginPage from './LoginPage/LoginPage';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase-config';
import Header from './Header/Header';
import ChatRooms from './ChatComponents/ChatRooms';

const App = () => {
  const [user] = useAuthState(auth);
  return (
    <React.Fragment>
      <Header />
      {user ? <ChatRooms /> : <LoginPage />}
    </React.Fragment>
  );
};

export default App;
