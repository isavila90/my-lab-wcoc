import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDtCE788JahIJuVZTN30YFtIykIvOb-7UQ",
    authDomain: "mylab-5026c.firebaseapp.com",
    projectId: "mylab-5026c",
    storageBucket: "mylab-5026c.appspot.com",
    messagingSenderId: "110824932826",
    appId: "1:110824932826:web:72ece9eff29c6e876dece3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;