import React from 'react';
import {BrowserRouter as Router,Route ,Routes, Navigate} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import './App.css'
import UserInfo from './components/UserInfo';
import Posts from './components/Posts';
import Todos from './components/Todos';
import Albums from './components/Albums';

function App() {
  const UserContext = createContext({user:{},set:()=>{}});
  const [currentUser, setCurrentUser] = useState({})
  const set = (user) => {
    setCurrentUser(user);
  };
  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
  }, [currentUser]);
  return (
    <>
      <Router>
        <Routes >
          <Route path='/' element={<Navigate to={'/login'}/>} />
          <Route path='/home/users/:id'element={<Home/>}>
            <Route path='logout'/>
            <Route path='albums' element={<Albums/>}/>
            <Route path='posts' element={<Posts/>}/>
            <Route path='todos' element={<Todos/>}/>
            <Route path='info' element={<UserInfo/>}/>
          </Route>
          <Route path='/login'element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
