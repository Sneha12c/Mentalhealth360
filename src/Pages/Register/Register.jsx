import "./register.css"
import { useState } from "react"; 
// import { EventHandler } from "react";
import { FormEvent } from "react"; 
import React from 'react'

export default function Register() {
   const [username , setusername] = useState(' ');
   const [email , setemail] = useState(' ');
   const [password , setpassword] = useState(' ');
   async function Register(ev){
     ev.preventDefault();
    const response = await fetch('http://localhost:4000/register' , {
      method : 'POST',
      body : JSON.stringify({username , email , password }),
      headers : {'Content-Type': 'application/json'},
     });
     if (response.status === 200) {
      alert('registration successful');
    } else {
      alert('registration failed');
    }
   }
    return (
        <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={Register}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..."
        value = {username} onChange = {ev=> setusername(ev.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..." 
        value = {email} onChange = {ev=> setemail(ev.target.value) }/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..."
        value = {password} onChange = {ev=> setpassword(ev.target.value) } />
        <button className="registerButton">Register</button>
      </form>
        
    </div>
    )
}