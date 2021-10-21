import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {

    apiKey: "AIzaSyAmFkA_tGqmnKlVzq5E4ioNC6XzpMpR0Aw",
    authDomain: "signal-clone-a8f1f.firebaseapp.com",
    projectId: "signal-clone-a8f1f",
    storageBucket: "signal-clone-a8f1f.appspot.com",
    messagingSenderId: "908884066922",
    appId: "1:908884066922:web:722894ef64797bddc78013"
};

let app;

if (app) {
    app = firebase.app();

} else {
    app = firebase.initializeApp(firebaseConfig);
}

const db = app.firestore();
const auth = app.auth();


export { db, auth, app };