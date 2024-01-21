import React, { createContext, useContext,useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css'
import Info from './components/Info';
import Posts from './components/posts/Posts';
import Todos from './components/todos/Todos';
import Albums from './components/albums/Albums';

import Comments from './components/posts/comments/Comments';
import Layout from './components/Layout';
import Photos from './components/albums/photos/Photos';




export const UserContext = createContext();

function App() {
 
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const currntUser=JSON.parse(localStorage.getItem("currentUser"))

   currntUser&& fetch(`http://localhost:3000/users?username=${currntUser.username}`)
    .then(async response => {
      const data = await response.json();
      response.ok   && setCurrentUser(data[0])
     
    })
    
  }, []);
  return (
    <>
      <UserContext.Provider value={[currentUser,setCurrentUser]}>
      <Router>
        <Routes >
          <Route path='/' element={<Navigate to={'/login'} />} />
          <Route path='/home/users/:id' element={<Home />}>

            <Route path='albums' element={<Layout />} >
            <Route index element={<Albums />} />
              <Route path=":id/photos" element={<Photos />} />
            </Route>
            <Route path="posts" element={<Layout />} >
              <Route index element={<Posts />} />
              <Route path=":id/comments" element={<Comments />} />
            </Route>
            <Route path='todos' element={<Todos />} />
            <Route path='info' element={<Info />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      </UserContext.Provider>
    </>
  )
}

export default App

