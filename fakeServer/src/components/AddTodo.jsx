import React from "react";


const AddTodo = ({ setIsAdd,getTodos }) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));


    const addNewTodo = (element) => {
        element.preventDefault();
        //חישוב ID 

        const todo = {
            userId: user.id,
            id: "512",
            title: element.target[0].value,
            completed: element.target[1].checked
        }
console.log(todo);

        fetch('http://localhost:3000/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
        })
            .then(response => {
                (!response.ok) ? alert("oops somthing went wrong... please try again!") :( setIsAdd(false) ,getTodos())
            })

    }
    return (
        <>
            <form onSubmit={addNewTodo}>
                <input type="text" placeholder="title..." /><br />
                <label htmlFor="checkbox">completed</label>
                <input  id="checkbox" type="checkbox" /><br />
                <input type="submit" value='add todo' /><br />
            </form>
        </>
    )
}
export default AddTodo