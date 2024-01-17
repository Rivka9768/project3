import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from 'react-select/animated'

const SearchPosts = () => {
    const animatecomponent = makeAnimated();
    const search = [{ label: "id", value: "id" }, { label: "title", value: "title" }];
    const selectOption=()=>{
        
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
        </>
    )
}
export default SearchPosts;