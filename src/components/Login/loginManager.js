import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => firebase.initializeApp(firebaseConfig);

export const handleGoogleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const { displayName, photoURL, email } = res.user;
            const newUser = {
                isSignedIn: true,
                name: displayName,
                email: email,
                photo: photoURL
            }
            return newUser;
            // console.log(displayName, photoURL, email);
        })
        .catch(err => {
            console.log(err);
            console.log(err.message);
        });
}

export const handleSignOut = () => {
    // console.log("sign out clicked");
    return firebase.auth().signOut()
        .then(() => {
            console.log("sign out successfull")
            const signedOutuser = {
                isSignedIn: false,
                name: '',
                email: '',
                photo: ''
            }
            return signedOutuser;
        }).catch((err) => {
            console.log(err);
        })
}

export const createWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserInfo(name);
            return newUserInfo;
            // console.log(res)
            // console.log(user.name, "from sign up finction");
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
            // console.log(res.user);
        })
        .catch(error => {
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        })
}

export const updateUserInfo = name => {
    // console.log(name);
    const user = firebase.auth().currentUser;

    user.updateProfile({
        displayName: name,
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
    }).then(function () {
        console.log("Updated Successfully");
    }).catch(function (error) {
        console.log(error);
    });
}