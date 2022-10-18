import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD-lBWhMJC84-XDE-SKDBjzSu-SYzO1sG4',
  authDomain: 'chattr-7f98c.firebaseapp.com',
  projectId: 'chattr-7f98c',
  storageBucket: 'chattr-7f98c.appspot.com',
  messagingSenderId: '364504514983',
  appId: '1:364504514983:web:75211b42685469659bf682',
  measurementId: 'G-DE24GL875G',
};

initializeApp(firebaseConfig);

const auth = getAuth();

const db = getFirestore();

const colRef = collection(db, 'messages');
const usersCol = collection(db, 'users');
const chatRoomsCol = collection(db, 'chatrooms');

export { auth, db, usersCol, colRef, chatRoomsCol };
