import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";

///https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/
const UserDetailes = ({ username, password }) => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const goToHome = (data) => {
        localStorage.setItem('currentUser', JSON.stringify(data));
        navigate(`/home/users/${data.id}`)
    }
    const addDetailes = (element) => {
        element.preventDefault();
        const [name, email, street, suite, city, zipcode, lat, lng, phone, companyName, catchPhrase, bs] = element.target;
        const user={ id: "11",
        name: name.value,
        username: username.value,
        email: email.value,
        address: {
            street: street.value,
            suite: suite.value,
            city: city.value,
            zipcode: zipcode.value,
            geo: {
                lat: lat.value,
                lng: lng.value
            }
        },
        phone: phone.value,
        website: password.value,
        company: {
            name: companyName.value,
            catchPhrase: catchPhrase.value,
            bs: bs.value
        }
    };
        fetch('http://localhost:3000/users', {
            method: 'POST',
            body: JSON.stringify(user),
        })
        .then(async response => {
            const data = await response.json();
            (!response.ok) ? alert("oops somthing went wrong... please try again!"): goToHome(data)
        }) 
    };
    return (
        <>
            <h1>add some more detailes...</h1>
            {/* "id": "1",  מס רץ */}
            <form noValidate onSubmit={addDetailes}>
                <input type="text" name="" id="" placeholder='name' />
                <input type="email" placeholder='email' name="email"
                    {...register("email", {
                        required: "Email is required.",
                        pattern: {
                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                            message: "Email is not valid."
                        }
                    })} />
                {errors.email && <p>{errors.email.message}</p>}
                <label>address</label>
                <input type='text' placeholder='street' />
                <input type='text' placeholder='suite' />
                <input type='text' placeholder='city' />
                <input type='text' placeholder='zipcode' />
                <label>geo</label>
                <input type='text' placeholder='lat' />
                <input type='text' placeholder='lng' />
                <input type="tel" name="" id="" placeholder='phone' />
                <label >company</label>
                <input type='text' placeholder='company name' />
                <input type='text' placeholder='catch phrase' />
                <input type='text' placeholder='bs' />
                <input type="submit" value="add detailes" />
            </form>
        </>
    );
}
export default UserDetailes










// import React, { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useForm } from "react-hook-form";

// ///https://www.freecodecamp.org/news/how-to-create-forms-in-react-using-react-hook-form/
// const UserDetailes = ({ username, password }) => {
//     const navigate = useNavigate();
//     const {
//         register,
//         handleSubmit,
//         formState: { errors }
//     } = useForm();
//     const s=(response)=>{
//         localStorage.setItem('currentUser',JSON.stringify(response[0]));
//         navigate(`/home/users/${response[0].id}`)
//     }
//     const addDetailes = (data) => {
//         data.preventDefault();
//         debugger
//         const [name, email, street, suite, city, zipcode, lat, lng, phone, companyName, catchPhrase, bs] = data.target;
//         debugger
//         fetch('http://localhost:3000/users', {
//             method: 'POST',
//             body: JSON.stringify({
//                 id: "11",
//                 name: name.value,
//                 username: username.value,
//                 email: email.value,
//                 address: {
//                     street: street.value,
//                     suite: suite.value,
//                     city: city.value,
//                     zipcode: zipcode.value,
//                     geo: {
//                         lat: lat.value,
//                         lng: lng.value
//                     }
//                 },
//                 phone: phone.value,
//                 website: password.value,
//                 company: {
//                     name: companyName.value,
//                     catchPhrase: catchPhrase.value,
//                     bs: bs.value
//                 }
//             }),
//         })
//         .then(response => response.json())
//         .then(response => (response.length) ?s(response)  : alert("oops somthing went wrong... please try again!"))
          
//     };
//     return (
//         <>
//             <h1>add some more detailes...</h1>
//             {/* "id": "1",  מס רץ */}
//             <form noValidate onSubmit={addDetailes}>
//                 <input type="text" name="" id="" placeholder='name' />
//                 <input type="email" placeholder='email' name="email"
//                     {...register("email", {
//                         required: "Email is required.",
//                         pattern: {
//                             value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
//                             message: "Email is not valid."
//                         }
//                     })} />
//                 {errors.email && <p>{errors.email.message}</p>}
//                 <label>address</label>
//                 <input type='text' placeholder='street' />
//                 <input type='text' placeholder='suite' />
//                 <input type='text' placeholder='city' />
//                 <input type='text' placeholder='zipcode' />
//                 <label>geo</label>
//                 <input type='text' placeholder='lat' />
//                 <input type='text' placeholder='lng' />
//                 <input type="tel" name="" id="" placeholder='phone' />
//                 <label >company</label>
//                 <input type='text' placeholder='company name' />
//                 <input type='text' placeholder='catch phrase' />
//                 <input type='text' placeholder='bs' />
//                 <input type="submit" value="add detailes" />
//             </form>
//         </>
//     );
// }
// export default UserDetailes