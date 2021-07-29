import firebase from "firebase/firebase";
import "firebase/firestore";

  const settings = {timestampsInSnapshots: true};

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const config = {
    apiKey: "AIzaSyCufHhPVdJDeLS1WXO6bWjc_NMOznYMbh4",
    authDomain: "task-project-react.firebaseapp.com",
    projectId: "task-project-react",
    storageBucket: "task-project-react.appspot.com",
    messagingSenderId: "41725427893",
    appId: "1:41725427893:web:e6b3d276e08c66996ffefc",
    measurementId: "G-REGNK3W5S9"
  };
  // Initialize Firebase
  firebase.initializeApp(config);
  firebase.analytics();

  firebase.firestore().settings(settings);

  export default firebase;
