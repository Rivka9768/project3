import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'

const SearchPosts = ({setPosts,allPosts,posts}) => {
    const animatecomponent = makeAnimated();
    const search = [{ label: "id", value: "id" }, { label: "title", value: "title" }];
    const [searchValues, setSearchValues] = useState([])
    const selectOption = (e) => {
        setSearchValues(e)
        console.log(e.length)
        e.length === 0 && setPosts(allPosts)
    }


    const searchByOption = (element) => {
        element.preventDefault();
        let values = [{ type: "id", value: "" }, { type: "title", value: "" }];
        for (let i = 0; i < element.target.length - 1; i++) {
          switch (element.target[i].name) {
            case "id":
              values[0] = { ...values[0], value: element.target[i].value }
              break;
            case "title":
              values[1] = { ...values[1], value: element.target[i].value }
              break;
          }
        }
        element.target.reset()
        let tempSelectedPosts = [];
        posts.forEach((post) => {
          if (((values[0].value != "") ? post.id === values[0].value : true)
            && ((values[1].value != "") ? post.title === values[1].value : true)
          ) 
            tempSelectedPosts.push(post)
        })
        console.log(tempSelectedPosts)
        setPosts(tempSelectedPosts)
      }
    
    return (
        <>
            <Select
                placeholder='Search posts by...'
                components={animatecomponent}
                onChange={(e) => selectOption(e)}
                options={search}
                isMulti
                getOptionLabel={(search) => search["label"]}
                getOptionValue={(search) => search["value"]} />
            {searchValues.length ? <form onSubmit={searchByOption}>{searchValues.map((value, index) => <input key={index} name={value.label} placeholder={value.label} />)}<input type="submit" /></form> : null}
        </>
    )
}
export default SearchPosts;