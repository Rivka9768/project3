import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import UserDetailes from './UserDetailes';

const Register = () => {
    const [error, setError] = useState({ name: "", password: "", passwordVerify: "" });
    const [exist, setExist] = useState("");
    const [password, setPassword] = useState("");
    const [input,setInput]=useState({name: "", password: ""})
    const navigate = useNavigate();

    const isExist = (name) => {
        fetch(`http://localhost:3000/users?username=${name}`)
            .then(response => response.json())
            .then(response => (response.length) ?setExist("exist")  : setExist("notExist") )
    }

    const signUp = (event) => {
        event.preventDefault();
        const [name, password] = event.target;
        if (!name.value || !password.value) {
            setExist("exist");
            return
        }
        setInput({name:name,password:password})
        isExist(name.value)
    }
    const validateInput = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        switch (name) {
            case "name": {
                if (/^[a-zA-Z ]+$/.test(value) === false)
                    setError({ ...error, name: "name illegal" });
                else
                    setError({ ...error, name: "" });
                break;
            }
            case "password": {
                if ((/^[a-zA-Z.]+$/.test(value) === false) || value.indexOf('.') === -1)
                    setError({ ...error, password: "password illegal" });
                else {
                    setError({ ...error, password: "" });
                    setPassword(value);
                }
                break;
            }
            case "passwordVerification": {
                if (value != password)
                    setError({ ...error, passwordVerify: "password verification illegal" });
                else
                    setError({ ...error, passwordVerify: "" });
            }
        }
    }

    return (
        <>
           
            {exist==="exist" && <div>you are an existing user please log in!</div>}
            {exist==="notExist"?<UserDetailes username={input.name} password={input.password}/>:
            <div>
                 <h1>sign up</h1>
            <form noValidate onSubmit={signUp}>
                <input type='text' name='name' placeholder='username' onChange={validateInput}></input>
                {error.name ? <p>{error.name}</p> : <br />}
                <input type="password" name="password" id="" placeholder='password' onChange={validateInput} />
                {error.password ? <p>{error.password}</p> : <br />}
                <input type="password" name="passwordVerification" id="" placeholder='password verification' onChange={validateInput} />
                {error.passwordVerify ? <p>{error.passwordVerify}</p> : <br />}
                <input disabled={error.name || error.password || error.passwordVerify ? true : false} type="submit" value="Sign Up" />
            </form>
            </div>
}
        </>
    );
}
export default Register
