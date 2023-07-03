import "./login.css";
import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {UserContext} from "../../component/UserContext";
import React from 'react';

export default function Login() {
  const [email, setemail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo} = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
   const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({email, password}),
      headers: {'Content-Type':'application/json'},
      credentials : 'include',
    });
    if (response.ok) {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      // if (response.status === 401) {
        alert('Invalid email or password'); // Show a user-friendly error message
      // } else {
        // Handle other error scenarios
        // alert('An error occurred during login. Please try again later.');
      // }
    }
  }

  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit = {login} >
        <label>Email</label>
        <input className="loginInput" type="text" placeholder="Enter your email..." 
        value= {email} onChange={ev => setemail(ev.target.value)} />
        <label>Password</label>
        <input className="loginInput" type="password" placeholder="Enter your password..."
        value={password}
        onChange={ev => setPassword(ev.target.value)} />
        <button className="loginButton">Login</button>
      </form>
       
    </div>
  );
}