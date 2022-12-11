import React, { useContext } from 'react';
import classes from './Header.module.css';
import SignOut from '../SignOut/SignOut';
import FirebaseContext from '../store/firebase-context';
import ProfileMenu from '../ProfileMenu/ProfileMenu';

const Header = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser, activeProfileMenu, activeProfileMenuHandler } =
    firebaseProviderCtx;
  return (
    <div className={classes.header} onClick={() => activeProfileMenuHandler()}>
      <p>chattr</p>
      <img
        className={classes.profile_picture}
        src={loggedInUser.photoURL}
        referrerPolicy="no-referrer"
      />
      {activeProfileMenu && <ProfileMenu />}
    </div>
  );
};

export default Header;
