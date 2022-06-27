import React, { useEffect, useState } from 'react'
import Landing from './components/landing/landing'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./components/Register/Register"
import Login from "./components/login/login"
import Nav from './components/nav/nav'
import Post from './components/Post/Post'
import Nav2 from './components/Nav2/Nav2'
import Discussion from './components/Discussion/Discussion'
import axios from 'axios'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function App() {
  const [info, setInfo] = useState(false);
  const [login, setLogin] = useState([]);
  const [img, setImg] = useState();
  useEffect(() => {
    if (localStorage.getItem("info") === "true")
      setInfo(true);
    else
      setInfo(false);
    var id = localStorage.getItem("userId");
    sendReq(id);
    //console.log("sdf", info);

  }, [])
  async function sendReq(id) {

    axios.get(`https://social-coderr.herokuapp.com/data/user_details/${id}`).then((res) => {
      setLogin(res.data);
    }, (err) => {
      console.log(err);
    })
    await axios.get(`https://social-coderr.herokuapp.com/data/user_profile/${id}`).then((res) => {
      setImg(res.data);
      // console.log(res.data);
    }, (err) => {
      console.log(err);
    })

  }
  async function login_details(data) {
    if (Object.keys(data).length !== 0) {
      setLogin(data)
      setInfo(true);
      localStorage.setItem("info", true);
      await localStorage.setItem("userId", data._id);
      await axios.get(`https://social-coderr.herokuapp.com/data/user_profile/${data._id}`).then((res) => {
        setImg(res.data);
        // console.log(res.data);
      }, (err) => {
        console.log(err);
      })
    }
    else {
      setInfo(false);
      // console.log(info);
      localStorage.setItem("info", false);
    }
    //console.log(info);
  }
  function logout() {
    var a = window.confirm("Are you sure");
    if (a) {
      setInfo(false);
      localStorage.setItem("info", false);
    }

  }

  return (
    <div>

      <BrowserRouter>

        {!info ? < Nav /> : <Nav2 logout={logout} />}

        <Routes>
          {!info ? <Route path="/" element={<Landing />} /> : <Route path="/" element={<Post login={login} image={img} />} />}
          {/* <Route path="/*" element={<Landinghandler info={info} />} /> */}
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login login_details={login_details} />} />
          {/* <Route path="/Post" element={<Post />} /> */}
          <Route path="/Discussion/:id" element={<Discussion login={login} image={img} />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}


export default App;