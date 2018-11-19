import firebase from 'react-native-firebase'
const CONFIG_FIREBASE = {
    apiKey: "AIzaSyBGnqZJB2eTqXUfMcufEYnu5m45rGghZpU",
    authDomain: "alobo-292b6.firebaseapp.com",
    databaseURL: "https://alobo-292b6.firebaseio.com",
    projectId: "alobo-292b6",
    storageBucket: "alobo-292b6.appspot.com",
    messagingSenderId: "446312037474"
}
export default firebaseApp = firebase.initializeApp(CONFIG_FIREBASE);