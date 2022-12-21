import './App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './LoginPage/LoginPage';
import FirebaseContext from './store/firebase-context';
import ChatsHome from './ChatComponents/ChatsHome';

const App = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  return (
    <React.Fragment>
      {!firebaseProviderCtx.isLoggedIn && <LoginPage />}
      {firebaseProviderCtx.isLoggedIn && <ChatsHome />}
      <Router>
        <Routes>
          <Route index path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
};

export default App;
