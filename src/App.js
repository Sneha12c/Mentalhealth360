import React from 'react'
import Header from './component/header/Header';
import Home from './Pages/home/Home';
import Publish from './component/Publish/Publish';
// import Singlepost from './component/Singlepost/Singlepost';
import { library } from '@fortawesome/fontawesome-svg-core'
import Write from './Pages/Write/Write';
import Setting from './Pages/Setting/Setting';
import Register from './Pages/Register/Register';
import Login from './Pages/Login/Login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Single from './Pages/single/Single';
import Post from './component/Post/Post';
import { UserContextProvider } from './component/UserContext';
import EditPost from './Pages/edit/edit';

export default function App() {
  // const user = true;
  return (
    <div  >
      <UserContextProvider>
      <Router>
      <Header></Header>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={   <Login/>}/>
          <Route exact path="/register" element={ <Register/>}/>
          <Route path="/write" element={ <Write/> }/>
          <Route exact path = "/post/:id" element= {<Single/>}/>
          <Route path="/Setting" element={ <Setting/> }/>
          <Route exact path = "/edit/:id" element= {<EditPost/>}/>
          <Route path='/post' element={<Post/>}/>
          <Route path='/publish' element={<Publish/>}/>
      </Routes>
      </Router>
      </UserContextProvider>
      {/* <Home></Home> */}
      {/* <Publish></Publish> */}
      {/* <Singlepost></Singlepost> */}
      {/* <Write></Write> */}
      {/* <Setting></Setting> */}
    </div>
  )
}

