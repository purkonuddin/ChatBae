/* eslint-disable react-native/no-inline-styles */
import firebase from 'firebase';
import {process} from '../../env';

const firebaseConfig = {
  apiKey: process.env_FIREBASE_KEY,
  authDomain: process.env_FIREBASE_DOMAIN,
  databaseURL: process.env_FIREBASE_DATABASE,
  projectId: process.env_FIREBASE_PROJECT_ID,
  storageBucket: process.env_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env_FIREBASE_SENDER_ID,
  appId: process.env_FIREBASE_APP_ID,
};

let app = firebase.initializeApp(firebaseConfig);

export const Database = app.database();
export const Auth = app.auth();
