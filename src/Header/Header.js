import React, { useContext } from 'react';
import classes from './Header.module.css';
import FirebaseContext from '../store/firebase-context';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import Logo from '../assets/logo.svg';
import stockImage from '../assets/sample-account-image.png';

const Header = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);
  const { loggedInUser, activeProfileMenu, activeProfileMenuHandler } =
    firebaseProviderCtx;
  return (
    <div className={classes.header}>
      <img src={Logo} className={classes.logo} />
      <img
        onClick={() => activeProfileMenuHandler()}
        className={classes.profile_picture}
        src={loggedInUser.photoURL || stockImage}
        referrerPolicy="no-referrer"
      />
      {activeProfileMenu && <ProfileMenu />}
      {activeProfileMenu && (
        <div
          className={classes.background}
          onClick={activeProfileMenuHandler}
        />
      )}
    </div>
  );
};

export default Header;
