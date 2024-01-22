import React, { useEffect, useState,useContext } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AddTodo from './AddTodo'
import { MdDelete, MdModeEdit } from "react-icons/md";
import UpdateTodo from "./UpdateTodo";
import SortTodos from "./SortTodos";
import SearchTodos from "./SearchTodos";
import { UserContext } from "../../App";
const Todos = () => {

  const [currentUser,setCurrentUser] = useContext(UserContext);
  // const user = JSON.parse(localStorage.getItem("currentUser"));
  
  const [exist, setExist] = useState(false);
  const [todos, setTodos] = useState([]);
  let [allTodos, setAllTodos] = useState([])
  const [isUpdate, setIsUpdate] = useState(-1);
  const [isAdd, setIsAdd] = useState(false);

  const getTodos = () => {
    fetch(`http://localhost:3000/todos?userId=${currentUser.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok ? setExist(true) : setExist(false);
        setTodos(data);
        setAllTodos(data)
      })
  }

  console.log(todos);
  useEffect(() => {
    console.log(`curr  ${currentUser}`)
    getTodos()
  }, [currentUser])

  const remove = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        response.ok ? getTodos() : alert("oops somthing went wrong... please try again!");
      })
  }

  return (
    <>
      <h2>here is your todos list...</h2>
      <h3>feel free to veiw, edit and remove:)</h3>
      {!exist ? <AiOutlineLoading3Quarters /> : < >
        <button onClick={() => setIsAdd(!isAdd)}>add todo</button>
        {isAdd && <AddTodo setIsAdd={setIsAdd} getTodos={getTodos} />}
        <SortTodos todos={todos} setTodos={setTodos} setAllTodos={setAllTodos} />
        <SearchTodos setTodos={setTodos} allTodos={allTodos} />
        {todos.map((todo, index) =>
          <div key={index}>
            <span >id: {todo.id}</span>
            {isUpdate != index ? <>
              <span >title: {todo.title}</span>
              <label>completed</label>
              <input type="checkbox" disabled={true} checked={todo.completed} />
            </> :
              <UpdateTodo setIsUpdate={setIsUpdate} todo={todo} getTodos={getTodos} />}
            <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
            <button disabled={isUpdate === index} onClick={() => remove(todo.id)}><MdDelete /></button>
          </div>
        )}</>
      }
    </>
  )
}
export default Todos

//האם צריך להתיחס לheaders


{/* <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>TITLE</th>
              <th>IS COMPLETED</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => {
              return (<>
                <tr><td>{todo.id}</td><td>{todo.title}</td><td><input type="checkbox" disabled={true} checked={todo.completed} /></td></tr>
                <tr>       <td></td>      <td> <button onClick={update}>update</button><button onClick={() => remove(todo.id)}>remove</button></td><td></td></tr>
              </>)
            })}
          </tbody>
        </table> */}
