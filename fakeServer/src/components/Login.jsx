import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [error, setError] = useState({ name: "", password: "" });
    const [input, setinput] = useState({ name: "", password: "" });
    const navigate = useNavigate();
    const isExist = (name, password) => {
        fetch(`http://localhost:3000/users?name=${name}&&website=${password}`)
            .then(response => response.json())
            .then(data => (data != null) ? navigate('/home') : alert("fged"));
    }

    const logIn = (event) => {
        event.preventDefault();
        const [name, password] = event.target;
        debugger
        let tempError = { name: "", password: "" };
        if (!name.value)
            tempError = { ...tempError, name: "please enter a name" }
        if (!password.value)
            tempError = { ...tempError, password: "please enter a password" }
        setError(tempError);
        isExist(name.value, password.value)
    }
    const validateInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case "name": {
                if (/^[a-zA-Z ]+$/.test(value) === false)
                    setError({ ...error, name: "name illegal" })
                else
                    setError({ ...error, name: "" })
                break;
            }
            case "password": {
                if ((/^[a-zA-Z.]+$/.test(value) === false) || value.indexOf('.') === -1)
                    setError({ ...error, password: "password illegal" })
                else
                    setError({ ...error, password: "" })
            }
        }
    }

    return (
        <>
            <h1>login</h1>
            <form noValidate onSubmit={logIn}>
                <input type='text' name='name' placeholder='name' onChange={validateInput}></input>
                {error.name ? <p>{error.name}</p> : <br />}
                <input type="password" name="password" id="" placeholder='password' onChange={validateInput} />
                {error.password ? <p>{error.password}</p> : <br />}
                <input disabled={error.name ? true : false} type="submit" value="Log In" />
            </form>
        </>
    )
}
export default Login