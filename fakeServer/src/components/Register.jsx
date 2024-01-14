import  React from 'react'

const Register=()=>{
return(
    <>
     <form noValidate onSubmit={logIn}>
                 <input type='text' name='name' placeholder='name' onChange={validateInput}></input>
                 <input type="password" name="password" id="" placeholder='password' onChange={validateInput} />
                 <input type="password" name="passwordVerify" id="" placeholder='password verification' onChange={validateInput} />
                 <input type="submit" value="Sign Up" />
           </form>
    </>
)
}
export default Register


// const Login = () => {
//     const [error, setError] = useState({ name: "", password: "" });
//     const [exist, setExist] = useState(true);
//     const navigate = useNavigate();
//     debugger;
//     const isExist = (name, password) => {
//         fetch(`http://localhost:3000/users?name=${name}&&website=${password}`)
//             .then(response => response.json())
//             .then(response => (response.length) ? navigate('/home') : setExist(false))
//     }

//     const logIn = (event) => {
//         event.preventDefault();
//         const [name, password] = event.target;
//         if (!name.value || !password.value) {
//             setExist(false);
//             return
//         }
//         isExist(name.value, password.value)
//     }
//     const validateInput = (event) => {
//         event.preventDefault();
//         const { name, value } = event.target;
//         switch (name) {
//             case "name": {
//                 if (/^[a-zA-Z ]+$/.test(value) === false)
//                     setError({ ...error, name: "name illegal" })
//                 else
//                     setError({ ...error, name: "" })
//                 break;
//             }
//             case "password": {
//                 if ((/^[a-zA-Z.]+$/.test(value) === false) || value.indexOf('.') === -1)
//                     setError({ ...error, password: "password illegal" })
//                 else
//                     setError({ ...error, password: "" })
//             }
//         }
//     }

//     return (
//         <>
//             <h1>login</h1>
//             {!exist && <div>Incorrect username or password</div>}
//             <form noValidate onSubmit={logIn}>
//                 <input type='text' name='name' placeholder='name' onChange={validateInput}></input>
//                 {error.name ? <p>{error.name}</p> : <br />}
//                 <input type="password" name="password" id="" placeholder='password' onChange={validateInput} />
//                 {error.password ? <p>{error.password}</p> : <br />}
//                 <input disabled={error.name || error.password ? true : false} type="submit" value="Log In" />
//             </form>
//         </>
//     )
// }
// export default Login