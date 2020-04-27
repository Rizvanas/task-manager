import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID,
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const goalsRef = db.collection('goals');
export const usersRef = db.collection('users');
export const friendInvitesRef = db.collection('friendInvites');
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export const docId = firebase.firestore.FieldPath.documentId();
export const actionsRef = goalId =>
  db
    .collection('goals')
    .doc(goalId)
    .collection('actions');
export const userFriendsRef = id =>
  db
    .collection('users')
    .doc(id)
    .collection('friends');
