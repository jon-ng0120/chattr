import './App.css';
import React, { useContext } from 'react';

import LoginPage from './LoginPage/LoginPage';
import FirebaseContext from './store/firebase-context';
import Chats from './ChatComponents/Chats';

const App = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  return (
    <React.Fragment>
      {!firebaseProviderCtx.isLoggedIn && <LoginPage />}
      {firebaseProviderCtx.isLoggedIn && <Chats />}
    </React.Fragment>
  );
};

export default App;
