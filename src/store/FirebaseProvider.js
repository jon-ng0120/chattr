import React, { useState } from 'react';
import FirebaseContext from './firebase-context';

import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD-lBWhMJC84-XDE-SKDBjzSu-SYzO1sG4',
  authDomain: 'chattr-7f98c.firebaseapp.com',
  projectId: 'chattr-7f98c',
  storageBucket: 'chattr-7f98c.appspot.com',
  messagingSenderId: '364504514983',
  appId: '1:364504514983:web:75211b42685469659bf682',
  measurementId: 'G-DE24GL875G',
};

const FirebaseProvider = (props) => {
  initializeApp(firebaseConfig);

  const [isLoggedIn, setIsLoggedIn] = useState();
  const [activeChatUser, setActiveChatUser] = useState(null);
  const [mobileChatRoomView, setMobileChatRoomView] = useState(false);
  const [activeProfileMenu, setActiveProfileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const auth = getAuth();
  const db = getFirestore();

  const googleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const userObj = await signInWithPopup(auth, provider);
      const user = userObj.user;

      await setDoc(
        doc(db, 'users', user.uid),
        {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
        { merge: true }
      );
      setIsLoggedIn(true);
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
    }
  };

  const sampleAccountLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, 'john.smith@gmail.com', '123456');
      setIsLoggedIn(true);
    } catch (error) {
      console.log(error);
      setIsLoggedIn(false);
    }
  };

  const darkModeHandler = () => {
    setDarkMode(!darkMode);
    console.log(darkMode);
  };

  const setActiveChatHandler = (chatUser) => {
    setActiveChatUser(chatUser);
  };

  const mobileChatRoomHandler = () => {
    setMobileChatRoomView(!mobileChatRoomView);
  };

  const checkMobileView = () => {
    window.innerWidth <= 768 && mobileChatRoomHandler();
  };

  const activeProfileMenuHandler = () => {
    setActiveProfileMenu(!activeProfileMenu);
  };

  const firebaseContext = {
    db,
    auth,
    googleSignIn,
    loggedInUser: auth.currentUser,
    isLoggedIn,
    setIsLoggedIn,
    activeChatUser,
    setActiveChat: setActiveChatHandler,
    checkMobileView,
    mobileChatRoomView,
    activeProfileMenu,
    activeProfileMenuHandler,
    darkMode,
    darkModeHandler,
    sampleAccountLogin,
  };
  return (
    <FirebaseContext.Provider value={firebaseContext}>
      {props.children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
