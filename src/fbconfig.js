import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


var firebaseConfig = {
  apiKey: 'AIzaSyBu7JQQz-9efD4VV_3S84OqAMwCF110tHE',
  authDomain: 'devconnector-c63a5.firebaseapp.com',
  databaseURL: 'https://devconnector-c63a5.firebaseio.com',
  projectId: 'devconnector-c63a5',
  storageBucket: 'devconnector-c63a5.appspot.com',
  messagingSenderId: '823812706341',
  appId: '1:823812706341:web:11fa3ae791110958'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

export {firebase, auth, db as default};
