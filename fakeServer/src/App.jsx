import React, { createContext, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css'
import UserInfo from './components/UserInfo';
import Posts from './components/posts/Posts';
import Todos from './components/Todos';
import Albums from './components/Albums';
import Logout from "./components/Logout"
import Comments from './components/posts/comments/Comments';
import PostsLayout from './components/PostsLayout';






function App() {
  // const UserContext = createContext(null);
  // const [currentUser, setCurrentUser] = useState({})
  // const set = (user) => {
  //   setCurrentUser(user);
  // };
  // useEffect(() => {
  //   localStorage.setItem('currentUser', JSON.stringify(currentUser));
  // }, [currentUser]);
  return (
    <>
      {/* <UserContext.Provider value={{currentUser,setCurrentUser}}> */}
      <Router>
        <Routes >
          <Route path='/' element={<Navigate to={'/login'} />} />
          <Route path='/home/users/:id' element={<Home />}>
            <Route path='logout' element={<Logout />} />
            <Route path='albums' element={<Albums />} />
            <Route path="posts" element={<PostsLayout />} >
              <Route index element={<Posts />} />
              <Route path=":id/comments" element={<Comments />} />
            </Route>
            <Route path='todos' element={<Todos />} />
            <Route path='info' element={<UserInfo />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </Router>
      {/* </UserContext.Provider> */}
    </>
  )
}

export default App

