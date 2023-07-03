import "./header.css"
import { BrowserRouter as Router,
  Routes,
  Route,Link } from "react-router-dom";
import React from 'react';
import {useEffect , useState , useContext} from 'react';
import {UserContext} from '../UserContext';

export default function Header() {
  const {setUserInfo , userInfo} = useContext(UserContext);
   useEffect(()=>{
    fetch('http://localhost:4000/profile' , {
      credentials: 'include',
    }).then(response =>{
      response.json().then(userInfo =>{
      setUserInfo(userInfo);
      });
    })
   } , []);

   function logout(){
     fetch('http://localhost:4000/logout',{
      credentials: 'include',
      method: 'POST',
     })
     setUserInfo(null);
   }
   const email = userInfo ? userInfo.email : null;
  return (
    <div>
      <header>
        <img src="/images/logo.png" className='image'/>
        <Link to = "/"><li>Home</li></Link>
        <li href="/">Features</li>
        <li href="/">About Us</li>
        <div className='side'>
        {email ? (
          <li>
            <a onClick={logout}>Logout</a>
          </li>
        ) : (
          <>
            <Link to="/login">
              <li>LOGIN</li>
            </Link>
            <Link to="/register">
              <li>REGISTER</li>
            </Link>
          </>
        )}
        </div>
      </header>
    </div>
  )
}

