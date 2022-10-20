import React from 'react';
import classes from './LoginPage.module.css';
import GoogleIcon from '../assets/google-icon.png';
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo,
} from 'firebase/auth';
import { auth, usersCol } from '../firebase-config';
import { setDoc, doc } from 'firebase/firestore';

const LoginPage = () => {
  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    const user = await signInWithPopup(auth, provider);
    const isFirstLogin = getAdditionalUserInfo(user).isNewUser;

    if (isFirstLogin) {
      await setDoc(doc(usersCol, user.user.uid), {
        uid: user.user.uid,
        displayName: user.user.displayName,
        email: user.user.email,
        photoURL: user.user.photoURL,
        chats: [],
      });
    }
  };

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
      <div className={classes.google_login} onClick={googleSignIn}>
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
