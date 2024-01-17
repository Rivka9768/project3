import React, { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Select from "react-select";
import makeAnimated from 'react-select/animated'


const Todos = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [exist, setExist] = useState(false);
  const [todos, setTodos] = useState([]);
  let [allTodos, setAllTodos] = useState([])
  const [searchValues, setSearchValues] = useState([])
  // const show = ["Serial", "Execution", "Alphabetical", "Random"];
  const show = [
    { value: 'Serial', label: 'Serial' },
    { value: 'Execution', label: 'Execution' },
    { value: "Alphabetical", label: "Alphabetical" },
    { value: "Random", label: "Random" },];
  const animatecomponent = makeAnimated();
  const search = [
    { value: 'id', label: 'id' },
    { value: 'title', label: 'title' },
    { value: "completed", label: "completed" },];
  useEffect(() => {
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(async response => {
        const data = await response.json();
        (!response.ok) ? setExist(false) : setExist(true);
        setTodos(data);
        setAllTodos(data)
      })
  }, [])

  const update = () => {

  }
  const remove = (id) => {

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        (!response.ok) && alert("oops somthing went wrong... please try again!")
      })
  }

  const sortByCategory = (category) => {
    console.log(category.value);
    let tempTodos = [];
    todos.map(t => tempTodos.push(t));
    debugger;
    switch (category.value) {

      case "Serial":
        tempTodos.sort((a, b) => a.id - b.id);
        break;
      case "Execution":
        tempTodos.sort((a, b) => Number(b.completed) - Number(a.completed));
        break;

      case "Alphabetical":
        tempTodos.sort((a, b) => (a.title.toUpperCase() === b.title.toUpperCase()) ? 0 : (a.title.toUpperCase() < b.title.toUpperCase()) ? -1 : 1);
        break;
      case "Random":
        // tempTodos = shuffle(tempTodos)
        tempTodos = tempTodos.sort(() => Math.random() - 0.5)
        break;
    }
    console.log(tempTodos);
    setTodos(tempTodos)
    setAllTodos(tempTodos)
  }
  const selectOption = (e) => {

    setSearchValues(e)
    console.log(e.length)
    e.length === 0 && setTodos(allTodos)

  }
  const searchByOption = (element) => {
    element.preventDefault();
    let values = [{ type: "id", value: "" }, { type: "title", value: "" }, { type: "completed", value: "" }];
    for (let i = 0; i < element.target.length - 1; i++) {
      switch (element.target[i].name) {
        case "id":
          values[0] = { ...values[0], value: element.target[i].value }
          break;
        case "title":
          values[1] = { ...values[1], value: element.target[i].value }
          break;
        case "completed":
          values[2] = { ...values[2], value: element.target[i].value === "true" ? true : false }
          break;
      }
    }
    element.target.reset()
    let tempSelectedTodos = [];
    // allTodos.map(t => tempSelectedTodos.push(t));
    console.log(values)
    todos.forEach((todo) => {
      console.log(todo)
      if (((values[0].value != "") ? todo.id === values[0].value : true)
        && ((values[1].value != "") ? todo.title === values[1].value : true)
        && ((values[2].value != "") ? todo.completed === values[2].value : true)
      ) {
        tempSelectedTodos.push(todo)
      }
      else
        console.log("!ok")
    })
    console.log(tempSelectedTodos)
    setTodos(tempSelectedTodos)
  }

  return (
    <>
      <h2>here is your todos list...</h2>
      <h3>feel free to veiw, edit and remove:)</h3>
      {!exist ? <AiOutlineLoading3Quarters /> : <div >
        {/* <select onChange={(e) => sortByCategory(e.target.value)}>
          {show.map((category, index) => <option key={index} value={category}> {category}</option>)}
        </select> */}
        <Select
          placeholder='Sort todos by...'
          components={animatecomponent}
          onChange={(e) => sortByCategory(e)}
          options={show}
          getOptionLabel={(show) => show["label"]}
          getOptionValue={(show) => show["value"]} />
        <Select
          placeholder='Search todos by...'
          components={animatecomponent}
          onChange={(e) => selectOption(e)}
          options={search}
          isMulti
          getOptionLabel={(search) => search["label"]}
          getOptionValue={(search) => search["value"]} />

        {searchValues.length ? <form onSubmit={searchByOption}>{searchValues.map((value, index) => <input key={index} name={value.label} placeholder={value.label} />)}<input type="submit" /></form> : null}
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
        {todos.map((todo, index) =>
          <form key={index}>
            <span >id: {todo.id}</span> <span >title: "{todo.title}"</span>
            <label>        completed</label>
            <input type="checkbox" disabled={true} checked={todo.completed} />
            <button onClick={update}>edit</button>
            <button onClick={()=>remove(todo.id)}>remove</button>
          </form>
        )}</div>
      }
    </>
  )
}
export default Todos