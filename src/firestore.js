// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD2-3rRpka1f-p6Cr-YeZfCS5Bezj8HEZg",
    authDomain: "fairytube-9600c.firebaseapp.com",
    projectId: "fairytube-9600c",
    storageBucket: "fairytube-9600c.appspot.com",
    messagingSenderId: "274527479288",
    appId: "1:274527479288:web:046729810544d741d4620d",
    measurementId: "G-CJGHTP4195"
  };

  firebase.initializeApp(firebaseConfig);
  var db = firebase.firestore();
    
  export default db;