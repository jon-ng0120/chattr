import React, { useContext } from 'react';
import FirebaseContext from '../store/firebase-context';
import classes from './ProfileMenu.module.css';
import { signOut } from 'firebase/auth';

const ProfileMenu = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const {
    loggedInUser,
    auth,
    setIsLoggedIn,
    activeProfileMenuHandler,
    darkMode,
    darkModeHandler,
  } = firebaseProviderCtx;

  const signOutHandler = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      activeProfileMenuHandler();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={`${classes.profile_menu} ${darkMode || classes.light}`}>
      <div className={classes.user_details}>
        <img
          className={classes.profile_picture}
          src={loggedInUser.photoURL}
          referrerPolicy="no-referrer"
        />
        <div>
          <p>{loggedInUser.displayName}</p>
          <p>{loggedInUser.email}</p>
        </div>
      </div>
      <div className={classes.profile_menu_option} onClick={darkModeHandler}>
        <p>Switch Themes</p>
      </div>
      <div className={classes.profile_menu_option} onClick={signOutHandler}>
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default ProfileMenu;
