import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAQJcYt0CZ3utOidnpyzDKF94cWUV3WRXg",
    authDomain: "quizz-app-a108c.firebaseapp.com",
    projectId: "quizz-app-a108c",
    storageBucket: "quizz-app-a108c.appspot.com",
    messagingSenderId: "807063003420",
    appId: "1:807063003420:web:55a409bbf0cc4c97cc1ad9",
    measurementId: "G-BHE911JVYQ"
  };
  
  
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const storage = firebase.storage();
  const app = firebase.firestore();

export { auth, app, storage};
