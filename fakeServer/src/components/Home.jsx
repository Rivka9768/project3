import React ,{useContext}from 'react'
import {  NavLink, Outlet } from 'react-router-dom'
import { UserContext } from '../App'
const Home = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const logout=()=>{
        localStorage.removeItem("currentUser") ;
        window.history.replaceState(null,null,'/');
    }

    return (
        <>
            <header>
                <nav>
                    <NavLink onClick={logout} to={'/login'}  >Logout </NavLink>
                    <NavLink to="./albums">Albums </NavLink>
                    <NavLink to="./posts">Posts </NavLink>
                    <NavLink to="./todos">Todos </NavLink>
                    <NavLink to="./info">Info </NavLink>
                </nav>
            </header>
            <h1>Hi {currentUser.name}</h1>
            <Outlet />
        </>
    )
}
export default Home
