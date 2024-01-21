import React, {  useEffect ,useContext} from "react";

import { UserContext } from '../../App'
const AddTodo = ({ setIsAdd, getTodos }) => {
    let id;
    const [currentUser, setCurrentUser] = useContext(UserContext);
    useEffect(() => {
        fetch(`http://localhost:3000/nextIds/todos`)
            .then(async response => {
                const data = await response.json();
                if (response.ok) {
                    id = data.nextId;
                    fetch(`http://localhost:3000/nextIds/todos`, {
                        method: 'PATCH',
                        body: JSON.stringify({ nextId: data.nextId + 1 })
                    });
                } else alert("ioufg");
            })
    }, [])
    

    const addNewTodo = (element) => {

        element.preventDefault();
        const todo = {
            userId: currentUser.id,
            id: id,
            title: element.target[0].value,
            completed: element.target[1].checked
        }
        console.log(todo);

        fetch('http://localhost:3000/todos', {
            method: 'POST',
            body: JSON.stringify(todo),
        })
            .then(response => {
                (!response.ok) ? alert("oops somthing went wrong... please try again!") : (setIsAdd(false), getTodos())
            })

    }
    return (
        <>
            <form onSubmit={addNewTodo}>
                <input type="text" placeholder="title..." /><br />
                <label htmlFor="checkbox">completed</label>
                <input id="checkbox" type="checkbox" /><br />
                <input type="submit" value='add todo' /><br />
            </form>
        </>
    )
}
export default AddTodo