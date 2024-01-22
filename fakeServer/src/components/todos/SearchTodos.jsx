
import React,{useState} from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'
const SearchTodos = ({setTodos ,allTodos}) => {

    const animatecomponent = makeAnimated();
    const search = [
      { value: 'id', label: 'id' },
      { value: 'title', label: 'title' },
      { value: "completed", label: "completed" },];
  

    const [searchValues, setSearchValues] = useState([])

    const selectOption = (e) => {

        setSearchValues(e)
        console.log(e.length)
        e.length === 0 && setTodos(allTodos)

    }
    const searchByOption = (element) => {
        debugger
        element.preventDefault();
        let values = [{ type: "id", value: "" }, { type: "title", value: "" }, { type: "completed", value: null}];
        for (let i = 0; i < element.target.length - 1; i++) {
            switch (element.target[i].name) {
                case "id":
                    values[0] = { ...values[0], value: element.target[i].value }
                    break;
                case "title":
                    values[1] = { ...values[1], value: element.target[i].value }
                    break;
                case "completed":
                    values[2] = { ...values[2], value:( element.target[i].value === "true" ? true : false) }
                    break;
            }
        }
        element.target.reset()
        let tempSelectedTodos = [];
        console.log(values)
        allTodos.forEach((todo) => {
            console.log(todo)
            if (((values[0].value != "") ? todo.id === values[0].value : true)
                && ((values[1].value != "") ? todo.title === values[1].value : true)
                && ((values[2].value != null) ? todo.completed === values[2].value : true)
            ) {
                tempSelectedTodos.push(todo)
            }
            else
                console.log("!ok")
        })
        console.log(tempSelectedTodos)
        setTodos(tempSelectedTodos)
    }






    return (<>
        <Select
            placeholder='Search todos by...'
            components={animatecomponent}
            onChange={(e) => selectOption(e)}
            options={search}
            isMulti
            getOptionLabel={(search) => search["label"]}
            getOptionValue={(search) => search["value"]} />

        {searchValues.length ?
            <form onSubmit={searchByOption}>
                {searchValues.map((value, index) =>
                    <input key={index} name={value.label} placeholder={value.label} />)}
                <input type="submit" value="search" />
            </form> : null}
    </>)
}


export default SearchTodos