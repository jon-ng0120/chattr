import React, { useContext } from 'react';
import FirebaseContext from '../store/firebase-context';
import classes from './ProfileMenu.module.css';

const ProfileMenu = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser } = firebaseProviderCtx;

  return (
    <div className={classes.profile_menu}>
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
      <div className={classes.profile_menu_option}>
        <p>Switch Themes</p>
      </div>
      <div className={classes.profile_menu_option}>
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default ProfileMenu;
