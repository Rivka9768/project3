import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [exist, setExist] = useState(true);
    const navigate = useNavigate();
    debugger;
    const isExist = (name, password) => {
        fetch(`http://localhost:3000/users?username=${name}&&website=${password}`)//לא עשינו לןכל סטורג
            .then(response => response.json())
            .then(response => (response.length) ? navigate('/home') : setExist(false))
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
        if (/^[a-zA-Z ]+$/.test(name) === false)//האם לאפשר שגם מספרים ותווים
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
                <input type='text' name='name' placeholder='name' ></input>
                <input type="password" name="password" id="" placeholder='password' />
                <input type="submit" value="Log In" />
            </form>
        </>
    )
}
export default Login