import React from 'react';
import {BrowserRouter as Router,Route ,Routes, Navigate} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes >
          <Route path='/' element={<Navigate to={'/login'}/>} />
          <Route path='/home'element={<Home/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
