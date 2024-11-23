const firebase = require("firebase");
const firebaseConfig = {
    apiKey: "AIzaSyA_CJCyRKFpSab4bybDNYgVGsCOtzJSXbk",
    authDomain: "smartaccess-88ec0.firebaseapp.com",
    databaseURL: "https://smartaccess-88ec0-default-rtdb.firebaseio.com",
    projectId: "smartaccess-88ec0",
    storageBucket: "smartaccess-88ec0.firebasestorage.app",
    messagingSenderId: "685539814365",
    appId: "1:685539814365:web:0df58c59485e03b210e434",
    measurementId: "G-8QQG3R6CRH"
  };
  
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const Client = db.collection("Cliente");
module.exports = Client;