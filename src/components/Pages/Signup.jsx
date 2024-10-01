import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Sections/Navbar";
import toast, { Toaster } from "react-hot-toast";
import "./Login.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;

      // Store user information in local storage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: username || 'Anonymous',
      }));

      console.log(result);
      navigate('/');
    } catch (error) {
      console.error("Signup Error:", error.message);
      toast.error("Signup Error: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Store user information in local storage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || 'Anonymous',
      }));

      console.log(result);
      navigate('/');
    } catch (error) {
      console.error("Google Sign-In Error:", error.message);
      toast.error("Google Sign-In Error: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="main-wrapper">
        <h1 className="welcome-text">
          <span>Hola,</span>
          <br />
          Welcome to <br /> <span  className="welcome-text-dodgerblue"> Zangetsu </span>
        </h1>
        <div className="login-container">
          <div style={{fontSize: '4rem', fontWeight: '500'}}>Sign in</div>
          <span style={{ color: "#78909C" }}>Please fill in your details.</span>
          <form className="login-form" onSubmit={handleSignup}>
            <label htmlFor="username">Username *</label>
            <input
              id="username"
              className="input input-username"
              placeholder="Your username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              className="input input-email"
              placeholder="Your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              className="input input-password1"
              placeholder="Your password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="confirm-password">Confirm Password *</label>
            <input
              id="confirm-password"
              className="input input-password2"
              placeholder="Confirm your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button type="submit">Sign Up</button>
          </form>

          <button onClick={handleGoogleSignIn}>Sign Up with Google</button>

          <div className="signupprompt">
            <span>Already have an account?</span>
            <a href="/login">Sign In</a>
          </div>
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
        position="top-right"
      />
    </>
  );
};

export default SignupPage;
