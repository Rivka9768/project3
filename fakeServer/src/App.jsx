import React from 'react';
import {BrowserRouter as Router,Route ,Routes} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <Routes >
          <Route path='/home'element={<Home/>}/>
          <Route path='/login'element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
