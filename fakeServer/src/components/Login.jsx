import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { UserContext } from '../App'
// import { UserContext } from '../App';


const Login = () => {

    const [currentUser, setCurrentUser] = useContext(UserContext);
    const [exist, setExist] = useState(true);
    const navigate = useNavigate();
    const goToHome = (data) => {
        setCurrentUser(data)
        localStorage.setItem('currentUser', JSON.stringify({username:data.username,id:data.id}));
        navigate(`/home/users/${data.id}`)
    }

    const isExist = (name, password) => {
        fetch(`http://localhost:3000/users?username=${name}&&website=${password}`)
            .then(async response => {
                const data = await response.json();
                (!response.ok) ? setExist(false) : goToHome(data[0])
            })
    }

    const logIn = (event) => {
        event.preventDefault();
        const [name, password] = event.target;
        debugger
        if (!validateInput(name.value, password.value)) {
            setExist(false);
            return
        }
        setExist(true);
        isExist(name.value, password.value)
    }

    const validateInput = (name, password) => {
        if (/^[a-zA-Z. ]+$/.test(name) === false)//האם לאפשר שגם מספרים ותווים
            return false;
        if ((/^[a-zA-Z.]+$/.test(password) === false) || password.indexOf('.') === -1)
            return false;
        if (!name || !password)
            return false;
        return true;
    }

    return (
        <>
            <h1>login</h1>
            {!exist && <div>Incorrect username or password</div>}
            <form noValidate onSubmit={logIn}>
                <input type='text' name='name' placeholder='username' ></input>
                <input type="password" name="password" id="" placeholder='password' />
                <input type="submit" value="Log In" />
            </form>
            <div>Are you a non-existent user? <Link style={{textDecoration:'underline'}}to={'/register'}>please sign up</Link></div>
        </>
    )
}
export default Login