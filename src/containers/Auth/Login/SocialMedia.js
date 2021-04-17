import firebase from '../../../Firebase/Firebase'

const socialMediaAuth = (provider) => {
    return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
        return res.user;
    })
    .catch((er) => {
        return er;
    })
}

export default socialMediaAuth