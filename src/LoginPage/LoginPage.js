import React, { useContext } from 'react';
import classes from './LoginPage.module.css';
import GoogleIcon from '../assets/google-icon.png';
import FirebaseContext from '../store/firebase-context';

const LoginPage = () => {
  const firebaseProviderCtx = useContext(FirebaseContext);

  return (
    <div className={classes.parent_div}>
      <h2>Welcome Back</h2>

      <div className={classes.login_credentials}>
        <div>
          <label>Email</label>
          <input type="email" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" />
        </div>
      </div>
      <button className={classes.login_button}>Login</button>
      <div>
        <p>Or</p>
      </div>
      <div
        className={classes.google_login}
        onClick={firebaseProviderCtx.googleSignIn}
      >
        <img src={GoogleIcon} />
        <span>Sign in with Google</span>
      </div>
      <div>
        <p>
          Need an account? <span className={classes.sign_up}>Sign Up</span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
