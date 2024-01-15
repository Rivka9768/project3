import React , {useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";



const Todos = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [exist, setExist] = useState(false);
  const [todos, setTodos] = useState([]);
  const show = ["Serial", "Execution", "Alphabetical", "Random"]
  useEffect(() => {
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(async response => {
        const data = await response.json();
        (!response.ok) ? setExist(false) : setExist(true);
        setTodos(data);
        console.log(data)
      })
  }, [])

  const update = () => {

  }
  const remove = () => {

  }
  const showByCategory=()=>{
    let arr=todos.sort((a, b) => (a.title.toUpperCase() <  b.title.toUpperCase())? -1 :1);
    setTodos(arr)
    debugger;
    // setTodos(prevTodos=>prevTodos.sort((a, b) => (a.title.toUpperCase() <  b.title.toUpperCase())? -1 :1 ));
  }

  return (
    <>
      <h1>todos</h1>
      {!exist ? <AiOutlineLoading3Quarters /> : <div >

        <select onChange={showByCategory}>
          {show.map((category,index)=><option key={index}> {category}</option>)}
        </select>
        {todos.map((todo, index) => {
          return (
            console.log(todo),
            <form key={index}>
              <p >id: {todo.id}</p>
              <p >title: {todo.title}</p>
              <label>completed</label>
              <input type="checkbox" disabled={true} defaultChecked={todo.completed} />
              <button onClick={update}>update</button>
              <button onClick={remove}>remove</button>
            </form>

          )
        })}</div>

      }



    </>
  )
}
export default Todos