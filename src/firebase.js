import firebase from 'firebase';

// Add your config here
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: ''
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
