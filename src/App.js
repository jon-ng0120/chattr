import './App.css';
import React, { useContext } from 'react';

import LoginPage from './LoginPage/LoginPage';
import FirebaseContext from './store/firebase-context';
import ChatsHome from './ChatComponents/ChatsHome';

const App = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  return (
    <React.Fragment>
      {!firebaseProviderCtx.isLoggedIn && <LoginPage />}
      {firebaseProviderCtx.isLoggedIn && <ChatsHome />}
    </React.Fragment>
  );
};

export default App;
