import React from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
    
    return (
        <Link  onClick={()=>{localStorage.removeItem("currentUser"); }} to={'/login'} replace>Log out</Link>//למחוק history
    )
}
export default Logout