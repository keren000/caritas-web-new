import * as actions from './actionTypes';
import {messaging} from '../../Firebase/Firebase'


// Sign up action creator
export const signUp = data => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  dispatch({ type: actions.AUTH_START });
  try {
    const res = await firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password);

    // Send the verfication email
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification({url: "https://caritasrevolution.com/login"});
    //Token
    const _fcm_token = await messaging.getToken()

    await firestore
      .collection('users')
      .doc(res.user.uid)
      .set({
        user_name: data.firstName + "  " + data.lastName,
        firstName: data.firstName,
        lastName: data.lastName,
        user_email: data.email,
        phone_number: data.phone_number,
        country: data.country,
        cause: [],
        fcm_token: {
          "token": _fcm_token,
          "platform": "Web"
        },
      });
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: "Something went wrong. Please try again." });
  }
  dispatch({ type: actions.AUTH_END });
};

// Logout action creator
export const signOut = () => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err.message);
  }
};

// Login action creator
export const signIn = data => async (dispatch, getState, { getFirebase }) => {
  const firebase = getFirebase();
  dispatch({ type: actions.AUTH_START });
  try {
    await firebase.auth().signInWithEmailAndPassword(data.email, data.password);
    dispatch({ type: actions.AUTH_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.AUTH_FAIL, payload: "Invalid login credentials" });
  }
  dispatch({ type: actions.AUTH_END });
};

// Clean up messages
export const clean = () => ({
  type: actions.CLEAN_UP,
});

// Verify email actionTypes
export const verifyEmail = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: actions.VERIFY_START });
  try {
    const user = firebase.auth().currentUser;
    await user.sendEmailVerification();
    dispatch({ type: actions.VERIFY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.VERIFY_FAIL, payload: err.message });
  }
};

// Send recover password
export const recoverPassword = data => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  dispatch({ type: actions.RECOVERY_START });
  try {
    // send email here
    await firebase.auth().sendPasswordResetEmail(data.email, {url: "https://caritasrevolution.com/login"});
    dispatch({ type: actions.RECOVERY_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.RECOVERY_FAIL, payload: err.message });
  }
};

// Edit profile
export const editProfile = data => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const { uid: userId, email: userEmail } = getState().firebase.auth;
  dispatch({ type: actions.PROFILE_EDIT_START });
  try {
    //edit the user profile
    if (data.email !== userEmail) {
      await user.updateEmail(data.email);
    }
 //Token
 const _fcm_token = await messaging.getToken()
 
    await firestore
      .collection('users')
      .doc(userId)
      .set({
        user_name: data.firstName + "  " + data.lastName,
        firstName: data.firstName,
        lastName: data.lastName,
        user_email: data.email,
        phone_number: data.phone_number,
        country: data.country,
        cause: [],
        fcm_token: {
          "token": _fcm_token,
          "platform": "Web"
        },
      });

    if (data.password.length > 0) {
      await user.updatePassword(data.password);
    }
    dispatch({ type: actions.PROFILE_EDIT_SUCCESS });
  } catch (err) {
    dispatch({ type: actions.PROFILE_EDIT_FAIL, payload: err.message });
  }
};

// Delete user
export const deleteUser = () => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const userId = getState().firebase.auth.uid;
  dispatch({ type: actions.DELETE_START });
  try {
    await firestore
      .collection('users')
      .doc(userId)
      .delete();


    await user.delete();
  } catch (err) {
    dispatch({ type: actions.DELETE_FAIL, payload: err.message });
  }
};
