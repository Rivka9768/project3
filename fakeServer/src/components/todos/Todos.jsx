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

  console.log(currentUser);
  useEffect(() => {
    getTodos()
  }, [])

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

//לחלק לקומפוננטות
//מחיקת הסטוריה לאחר יציאה
//לשמור ללוקל סטורג רק  שם ן ID 
//האם צריך להתיחס לheaders
// ID רץ ולשמור בסרבר

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














//         import React, { useEffect, useState } from "react";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
// import Select from "react-select";
// import makeAnimated from 'react-select/animated'
// import AddTodo from './AddTodo'
// import { MdDelete, MdModeEdit } from "react-icons/md";


// const Todos = () => {
//   const user = JSON.parse(localStorage.getItem("currentUser"));
//   const [exist, setExist] = useState(false);
//   const [todos, setTodos] = useState([]);
//   let [allTodos, setAllTodos] = useState([])
//   const [searchValues, setSearchValues] = useState([])
//   const [isUpdate, setIsUpdate] = useState(-1);
//   const [isAdd, setIsAdd] = useState(false);
//   const show = [
//     { value: 'Serial', label: 'Serial' },
//     { value: 'Execution', label: 'Execution' },
//     { value: "Alphabetical", label: "Alphabetical" },
//     { value: "Random", label: "Random" },];
//   const animatecomponent = makeAnimated();
//   const search = [
//     { value: 'id', label: 'id' },
//     { value: 'title', label: 'title' },
//     { value: "completed", label: "completed" },];

//   const getTodos = () => {
//     fetch(`http://localhost:3000/todos?userId=${user.id}`)
//       .then(async response => {
//         const data = await response.json();
//         response.ok ? setExist(true) : setExist(false);
//         setTodos(data);
//         setAllTodos(data)
//       })
//   }

//   useEffect(() => {
//     getTodos()
//   }, [])

//   const remove = (id) => {

//     fetch(`http://localhost:3000/todos/${id}`, {
//       method: 'DELETE'
//     })
//       .then(response => {
//         response.ok ? getTodos() : alert("oops somthing went wrong... please try again!");
//       })
//   }

//   const update = (element, id) => {

//     fetch(`http://localhost:3000/todos/${id}`, {
//       method: 'PATCH',
//       body: JSON.stringify({ title: element.target[1].value, completed: element.target[0].checked })
//     }).then(async response => {
//       const data = await response.json();
//       console.log(data)
//       response.ok ? getTodos() : alert("oops somthing went wrong... please try again!")
//     });
//   }


//   const sortByCategory = (category) => {
//     console.log(category.value);
//     let tempTodos = [];
//     todos.map(t => tempTodos.push(t));
//     debugger;
//     switch (category.value) {

//       case "Serial":
//         tempTodos.sort((a, b) => a.id - b.id);
//         break;
//       case "Execution":
//         tempTodos.sort((a, b) => Number(b.completed) - Number(a.completed));
//         break;

//       case "Alphabetical":
//         tempTodos.sort((a, b) => (a.title.toUpperCase() === b.title.toUpperCase()) ? 0 : (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : 1);
//         break;
//       case "Random":
//         tempTodos = tempTodos.sort(() => Math.random() - 0.5)
//         break;
//     }
//     console.log(tempTodos);
//     setTodos(tempTodos)
//     setAllTodos(tempTodos)
//   }
//   const selectOption = (e) => {

//     setSearchValues(e)
//     console.log(e.length)
//     e.length === 0 && setTodos(allTodos)

//   }
//   const searchByOption = (element) => {
//     element.preventDefault();
//     let values = [{ type: "id", value: "" }, { type: "title", value: "" }, { type: "completed", value: "" }];
//     for (let i = 0; i < element.target.length - 1; i++) {
//       switch (element.target[i].name) {
//         case "id":
//           values[0] = { ...values[0], value: element.target[i].value }
//           break;
//         case "title":
//           values[1] = { ...values[1], value: element.target[i].value }
//           break;
//         case "completed":
//           values[2] = { ...values[2], value: element.target[i].value === "true" ? true : false }
//           break;
//       }
//     }
//     element.target.reset()
//     let tempSelectedTodos = [];
//     // allTodos.map(t => tempSelectedTodos.push(t));
//     console.log(values)
//     todos.forEach((todo) => {
//       console.log(todo)
//       if (((values[0].value != "") ? todo.id === values[0].value : true)
//         && ((values[1].value != "") ? todo.title === values[1].value : true)
//         && ((values[2].value != "") ? todo.completed === values[2].value : true)
//       ) {
//         tempSelectedTodos.push(todo)
//       }
//       else
//         console.log("!ok")
//     })
//     console.log(tempSelectedTodos)
//     setTodos(tempSelectedTodos)
//   }

//   return (
//     <>
//       <h2>here is your todos list...</h2>
//       <h3>feel free to veiw, edit and remove:)</h3>
//       {!exist ? <AiOutlineLoading3Quarters /> : < >
//         <button onClick={()=>setIsAdd(!isAdd)}>add todo</button>
//         {isAdd && <AddTodo setIsAdd={setIsAdd} getTodos={getTodos}/>}
//         <Select
//           placeholder='Sort todos by...'
//           onChange={(e) => sortByCategory(e)}
//           options={show}
//           getOptionLabel={(show) => show["label"]}
//           getOptionValue={(show) => show["value"]} />

//         <Select
//           placeholder='Search todos by...'
//           components={animatecomponent}
//           onChange={(e) => selectOption(e)}
//           options={search}
//           isMulti
//           getOptionLabel={(search) => search["label"]}
//           getOptionValue={(search) => search["value"]} />

//         {searchValues.length ? <form onSubmit={searchByOption}>{searchValues.map((value, index) => <input key={index} name={value.label} placeholder={value.label} />)}<input type="submit" value="search"/></form> : null}

//         {todos.map((todo, index) =>
//           <div key={index}>
//             <span >id: {todo.id}</span>


//             {isUpdate != index ? <><span >title: {todo.title}</span> <label>completed</label>  <input type="checkbox" disabled={true} checked={todo.completed} /></> :
//               <form onSubmit={(e) => update(e, todo.id)}>
//                 <label>completed</label>
//                 <input type="checkbox" defaultChecked={todo.completed} />
//                 <label>title: </label>
//                 <input type="text" defaultValue={todo.title} />
//                 <input type="submit" value='update todo'/>
//               </form>}
//             <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
//             <button disabled={isUpdate === index} onClick={() => remove(todo.id)}><MdDelete /></button>
//           </div>
//         )}</>
//       }
//     </>
//   )
// }
// export default Todos

// //לחלק לקומפוננטות
// //מחיקת הסטוריה לאחר יציאה
// //לשמור ללוקל סטורג רק  שם ן ID
// //האם צריך להתיחס לheaders
// // ID רץ ולשמור בסרבר

// {/* <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>TITLE</th>
//               <th>IS COMPLETED</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todos.map((todo, index) => {
//               return (<>
//                 <tr><td>{todo.id}</td><td>{todo.title}</td><td><input type="checkbox" disabled={true} checked={todo.completed} /></td></tr>
//                 <tr>       <td></td>      <td> <button onClick={update}>update</button><button onClick={() => remove(todo.id)}>remove</button></td><td></td></tr>
//               </>)
//             })}
//           </tbody>
//         </table> */}