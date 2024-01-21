import React ,{useContext}from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
const Home = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    // const user=JSON.parse(localStorage.getItem("currentUser"));
    return (
        <>
            <header>
                <nav>
                    <NavLink onClick={()=>{localStorage.removeItem("currentUser") }} to={'/login'}  >Logout </NavLink>
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

//למחוק היסטוריה