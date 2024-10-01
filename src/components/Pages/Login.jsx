
import "./Login.css";
import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from "../Sections/Navbar";
import { Toaster } from "react-hot-toast";



const Login = ({ setIsLoggedIn }) => {
  
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
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
      console.error("Login Error:", error.message);
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
    }
  };
  
  return (
    <>
      <Navbar></Navbar>
      <div className="main-wrapper">
        <h1 className="welcome-text">
          <span>Hola,</span>
          <br />
          Welcome to <br /> <span  className="welcome-text-dodgerblue">Zangetsu </span>
        </h1>
        <div className="login-container">
          <div style={{fontSize: '4rem', fontWeight: '500'}}>Sign in</div>
          <span style={{ color: "#78909C" }}>
            Please sign in to your account.
          </span>
          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="">Email *</label>
            <input
              className="input input-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="">Password *</label>
            <input
              className="input input-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="extras">
              <div>
                <input
                  name="remembercheckbox"
                  className="remember-checkbox"
                  type="checkbox"
                />
                <span>Remember me</span>
              </div>
              <a href="/forgotpass">Forgot your password?</a>
            </div>
            <button type="submit">Sign In</button>
          </form>

          <button onClick={handleGoogleSignIn}>Sign In with Google</button>
          
          <div className="signupprompt">
            <span>Dont't have a account?</span>
            <a href="/signup">Sign Up</a> 
          </div>

          
        </div>
      </div>
      <Toaster
        toastOptions={{
          duration: 1000,
        }}
        position="top-right"
      ></Toaster>
    </>
  );
};
export default Login;
