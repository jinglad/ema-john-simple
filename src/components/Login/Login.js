// eslint-disable-next-line
import React, { useState, useEffect, isValidElement } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, signInWithEmailAndPassword, createWithEmailAndPassword } from './loginManager';

initializeLoginFramework();

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: '',
        success: ''
    })
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
                history.replace(from);
            })
    }

    const signOut = () => {
        handleSignOut()
            .then(res => {
                setUser(res);
                setLoggedInUser(res);
            })
    }
    const handleChange = (e) => {
        let isFormValid;
        // console.log(e.target.name, e.target.value);
        if (e.target.name === 'email') {
            isFormValid = /\S+@\S+\.\S+/.test(e.target.value);
            // console.log(isEmailValid);
        }
        if (e.target.name === 'password') {
            const isPassValid = e.target.value.length > 6;
            const passHasNum = /\d{1}/.test(e.target.value);
            isFormValid = isPassValid && passHasNum;
        }
        if (isFormValid) {
            const newUser = { ...user };
            newUser[e.target.name] = e.target.value;
            setUser(newUser);
        }
    }

    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })

        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    setUser(res);
                    setLoggedInUser(res);
                    history.replace(from);
                })
        }
        e.preventDefault();
        // console.log("submit clicked");
    }

    return (
        <div className="text-center mt-5">
            {user.isSignedIn ? <button onClick={signOut} className="btn btn-primary">Sign Out</button> : <button onClick={googleSignIn} className="btn btn-primary">Sign In</button>}
            {
                // user.isSignedIn && <h1>{user.name}</h1>
            }
            <br />
            <input onChange={() => setNewUser(!newUser)} type="checkbox" name="newUser" id="" /> Sign Up Now
            <form className="mt-2">
                <br></br>
                {newUser && <input onBlur={handleChange} className="mt-2 form-control-lg" type="text" name="name" placeholder="Name" />}
                <br />
                <input onBlur={handleChange} className="mt-2 form-control-lg" type="email" name="email" placeholder="Email" />
                <br />
                <input onBlur={handleChange} className="mt-2 form-control-lg" type="password" name="password" placeholder="Password" />
                <br />
                <input className="mt-2 form-control-lg" onClick={handleSubmit} type="submit" value="Submit" />
            </form>
            <p className="text-danger">{user.error}</p>
            <p className="text-success">{user.success}</p>
            {
                user.success && <p className="text-success">{newUser ? 'Sign Up' : 'Logged In'} successfull</p>
            }
        </div>
    );
};

export default Login;