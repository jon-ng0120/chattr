import React, { useContext } from 'react';
import classes from './LoginPage.module.css';
import GoogleIcon from '../assets/google-icon.png';
import Logo from '../assets/logo.svg';
import FirebaseContext from '../store/firebase-context';
import overview from '../assets/overview.png';
import demoVideo from '../assets/chattr-demo.mp4';

const LoginPage = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);

  return (
    <div className={classes.parent_div}>
      <div>
        <img src={Logo} />
        <div>
          <p className={classes.welcome}>Welcome to Chattr</p>
          <p className={classes.welcome_message}>
            Sign in now to connect with friends around the world in real-time
          </p>
          <div className={classes.actions}>
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
              <div className="material-icons">person</div>
              <div>Sign in with Sample Account</div>
            </div>
          </div>

          <div className={classes.playerContainer}>
            <video poster={overview} controls>
              <source src={demoVideo} type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
