import "./setting.css"

import React from 'react'

export default function setting() {
  return (
    <div className="settings"> 
       <div className="account">
         <div className="tittle">
         <span className="update">Update your account</span>
          <span className="delete">Delete your account</span>
         </div>
       <form className="setform">
        <label>Profile Picture</label>
        <div className="settingPP">
            <img></img>
        <label htmlFor="fileInput">
        <i class="Icon fa-solid fa-user"></i>
        </label>
        <input type="file" id="finalInput" style={{display : "none"}} />
        </div>
        <label >UserName</label>
        <input type="text " placeholder="Rahul"></input>
        <label >Email</label>
        <input type="text " placeholder="Rahul@gmail.com"></input>
        <label >Password</label>
        <input type="text " placeholder="*****"></input>
         <button className="submit">Update</button>
       </form>
       </div>
    </div>
  )
}


