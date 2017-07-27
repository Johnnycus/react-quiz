import firebase from 'firebase';

// Add your config here
const config = {
  apiKey: 'AIzaSyDVguPbIsZcjkINtSPAKz74IYFlZ0ywLYw',
  authDomain: 'react-quiz-c3d79.firebaseapp.com',
  databaseURL: 'https://react-quiz-c3d79.firebaseio.com',
  projectId: 'react-quiz-c3d79',
  storageBucket: 'react-quiz-c3d79.appspot.com',
  messagingSenderId: '613038513397'
};

firebase.initializeApp(config);

export default firebase;

export const database = firebase.database();
