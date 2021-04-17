import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage'
import 'firebase/functions'
import 'firebase/messaging'

import firebaseSecrets from './firebaseSecrets'

const config = {
  apiKey: firebaseSecrets.apiKey,
  authDomain: firebaseSecrets.authDomain,
  databaseURL: firebaseSecrets.databaseURL,
  projectId: firebaseSecrets.projectId,
  storageBucket: firebaseSecrets.storageBucket,
  messagingSenderId: firebaseSecrets.messagingSenderId,
  appId: firebaseSecrets.appId
};

firebase.initializeApp(config);
firebase.firestore();
export const db = firebase.firestore();

// export default firebase;

const storage = firebase.storage();
export const auth = firebase.auth
export const cloudFunctions = firebase.functions()
export const messaging = firebase.messaging()
//To login using google
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({
  promt: "select_account",
});

export const signInWithGoogle = () => auth().signInWithPopup(provider);

//To Login using facebook
const FacebookAuth = new firebase.auth.FacebookAuthProvider(); 
export const signInWithFacebook = () => auth().signInWithPopup(FacebookAuth);    

// const FacebookAuth = new firebase.auth.FacebookAuthProvider();
// provider.setCustomParameters({
//   'display': 'popup'
// });
// export const signInWithFacebook = () => auth().signInWithPopup(FacebookAuth);  
            
// export default firebase;
export { storage, firebase as default};
