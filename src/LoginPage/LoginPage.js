import React, { useContext } from 'react';
import classes from './LoginPage.module.css';
import GoogleIcon from '../assets/google-icon.png';
import Logo from '../assets/logo.svg';
import FirebaseContext from '../store/firebase-context';

const LoginPage = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);

  return (
    <div className={classes.parent_div}>
      <div>
        <img src={Logo} />
        <div>
          <p className={classes.welcome}>Welcome Back</p>
          <div
            className={classes.google_login}
            onClick={firebaseProviderCtx.googleSignIn}
          >
            <img src={GoogleIcon} />
            <span>Sign in with Google</span>
          </div>
          <div
            className={classes.google_login}
            onClick={firebaseProviderCtx.sampleAccountLogin}
          >
            <span className="material-icons">person</span>
            <span>Sign in with Sample Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
