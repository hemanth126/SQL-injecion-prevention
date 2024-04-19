
import React from 'react';
import { Route,Routes } from 'react-router-dom';
//import Navbar from './components/navbar/navbar.jsx';
import Login_form from "./components/login_page/login_form.jsx";
import Website from "./components/Website.jsx";
import Homepage from "./components/home_page/homepage.jsx";
import Register from './components/register/register.jsx';
import Profile from './components/profile/profile.jsx';
import Userinfo from './components/userinfo/userinfo.jsx';
import ResetP from './components/resetP/resetp.jsx';



function App() {
  return (
    <div className="App">

  <Routes>
  <Route path="/" element={<Website/>}/>
    <Route path="/Login_form" element={<Login_form/>}/>
    <Route path="/homepage" element={<Homepage/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/Profile" element={<Profile/>}></Route>
    <Route path="/userinfo" element={<Userinfo/>}></Route>
    <Route path="/resetp" element={<ResetP/>}></Route>
    <Route></Route>
  </Routes>
    </div>
  );
}
export default App;