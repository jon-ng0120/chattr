import React from 'react';
import { auth } from '../firebase-config';
import { signOut } from 'firebase/auth';

const SignOut = () => {
  const signUserOut = () => signOut(auth);

  return <button onClick={signUserOut}>Sign Out</button>;
};

export default SignOut;
