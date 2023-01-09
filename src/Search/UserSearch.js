import React, { useState, useEffect, useContext } from 'react';
// import { usersCol } from '../firebase-config';
import { query, where, onSnapshot, collection } from 'firebase/firestore';

import UserSearchItem from './UserSearchItem';
import classes from './UserSearch.module.css';
import FirebaseContext from '../store/firebase-context';

const UserSearch = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser, db } = firebaseProviderCtx;
  const [searchUser, setSearchUser] = useState('');
  const [foundUsers, setFoundUsers] = useState([]);

  const userSearchHandler = (e) => {
    const splitName = e.target.value.split(' ');
    const upperCaseName = splitName
      .map((word) => word.charAt(0).toUpperCase() + word.substring(1))
      .join(' ');
    setSearchUser(upperCaseName);
  };

  const selectedUserHandler = (user) => {
    firebaseProviderCtx.setActiveChat(user);
    firebaseProviderCtx.checkMobileView();
  };

  useEffect(() => {
    const usersCol = collection(db, 'users');
    const usersQuery = query(
      usersCol,
      where('displayName', '>=', searchUser),
      where('displayName', '<', searchUser + 'z')
    );

    onSnapshot(usersQuery, (snapshot) => {
      if (searchUser !== '') {
        setFoundUsers(
          snapshot.docs.map((doc) => {
            return doc.data();
          })
        );
      } else {
        setFoundUsers([]);
      }
    });
  }, [searchUser]);

  return (
    <div>
      <div className={classes.search_input}>
        <span className="material-icons">search</span>
        <input
          value={searchUser}
          onChange={userSearchHandler}
          placeholder="Search User"
        />
      </div>

      <div className={classes.search_results}>
        {foundUsers.map((user) => {
          if (user.uid !== loggedInUser.uid) {
            return (
              <UserSearchItem
                key={user.uid}
                user={user}
                selectUser={selectedUserHandler}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default UserSearch;
