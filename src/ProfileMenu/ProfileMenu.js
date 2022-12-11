import React, { useContext } from 'react';
import FirebaseContext from '../store/firebase-context';
import classes from './ProfileMenu.module.css';

const ProfileMenu = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser } = firebaseProviderCtx;
  console.log(loggedInUser);
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
      <div>
        <p>Switch Themes</p>
      </div>
      <div>
        <p>Sign Out</p>
      </div>
    </div>
  );
};

export default ProfileMenu;
