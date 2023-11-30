import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const Navigate = useNavigate();

  useEffect(() => {
    // Initialize 'user' key in sessionStorage if it doesn't exist
    if (!sessionStorage.getItem('user')) {
      sessionStorage.setItem('user', 'null'); // You can set it to any default value you want
    }

    // Check user status when the component mounts
    const user = sessionStorage.getItem('user');
    if (user !== 'null' && user !== null) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.setItem('user', '');
    Navigate('/logout');
  };

  return (
    <header>
      <div className="header">
        <img src="https://i.ibb.co/XtLf33q/Whats-App-Image-2023-11-27-at-22-55-54-c7bb85a9.jpg" alt="" id="logo" />
      
        {authenticated ? (
          <button id="logoutBtn" onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">
            <button id="loginBtn">Log In</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
