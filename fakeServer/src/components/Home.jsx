import React from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'

const Home = () => {

    return (
        <>
            <header>
                <nav>
                    <NavLink to="./logout">Logout </NavLink>
                    <NavLink to="./albums">Albums </NavLink>
                    <NavLink to="./posts">Posts </NavLink>
                    <NavLink to="./todos">Todos </NavLink>
                    <NavLink to="./info">Info </NavLink>
                </nav>
            </header>
            <h1>Hi {JSON.parse(localStorage.getItem("currentUser")).name}</h1>
            <Outlet/>

        </>
    )
}
export default Home

