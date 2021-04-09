import firebase from 'firebase';

const config = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();