import React, { useEffect, useState } from "react";
import { db } from '../../firebase';
import { useNavigate } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./login.css";

const Login = () => {
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('user', user);
  }, [user])

  const handleLogin = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const userQuery = query(usersCollection, where('email', '==', username), where('password', '==', password));
      const querySnapshot = await getDocs(userQuery);

      if (querySnapshot.empty) {
        setLoginError("Invalid username or password.");
      } else {
        querySnapshot.forEach((doc) => {
          const userId = doc.id;
          setUser(userId);
          sessionStorage.setItem('user', userId); // Set user in sessionStorage here
          navigate('/');
        });
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  if(user !== "" && user !== undefined){
    navigate('/');
  }

  return (
    <div id="login">
        <img src="https://i.ibb.co/XtLf33q/Whats-App-Image-2023-11-27-at-22-55-54-c7bb85a9.jpg" alt="" id="logo" />
      <br />
      <div id="loginForm">
        <input type="text" placeholder="Email" value={username} id="usernameInput" onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} id="passwordInput" onChange={(e) => setPassword(e.target.value)} />
        <button id="loginButton" onClick={handleLogin}>Login</button>
        {loginError && <p>{loginError}</p>}
      </div>
    </div>
  );
};

export default Login;