  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
  import { getDatabase, ref,set,onValue } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAm4OtjQefD4MY682MzpBybjsQ_7TelZog",
    authDomain: "chit-chat-elaya.firebaseapp.com",
    databaseURL: "https://chit-chat-elaya-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chit-chat-elaya",
    storageBucket: "chit-chat-elaya.appspot.com",
    messagingSenderId: "20621674538",
    appId: "1:20621674538:web:95106e74a2fe368c4adb53",
    measurementId: "G-80BL984CQK"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase();
  console.log(db);

  const starCountRef = ref(db, 'chit-chat/');
onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});

set(ref(db, 'chit-chat/'), {
  username: "name",
  email: "email",
  profile_picture : "imageUrl"
});
