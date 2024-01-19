// import React,{useState} from "react";
// const Photos = () => {

//     // Text to use for each post 
    
//     var photosPerPage = 20;

//     // Use useState to hold the posts being rendered to the screen 
//     // Create the array of posts to map to render 
//     const [posts, setPosts] = useState([...Array(photosPerPage).keys()]);

//     var postNumber = photosPerPage;

//     function handleScroll() {

//         var isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;

//         if (isAtBottom) {

//             // Load next posts 
//             postNumber += photosPerPage;

//             setPosts([...Array(postNumber).keys()]);

//         }

//     }

//     window.addEventListener("scroll", handleScroll);

//     return (

//         <div>

//             {posts.map((item, i) => (
//                 <p key={i}>{i}</p >
//             ))}

//         </div>

//     )

// }


var isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;

  if (isAtBottom) {
    // Load next posts
    postNumber += photosPerPage;
    setPosts(prevPosts => [...prevPosts, ...Array(photosPerPage).keys()]);
    setPostNumber(postNumber); // Update postNumber in state
  }

// export default Photos


import React, { useState } from "react";

const Photos = () => {

  // Text to use for each post
  var photosPerPage = 20;

  // Use useState to hold the posts being rendered to the screen
  // Create the array of posts to map to render
  const [posts, setPosts] = useState([...Array(photosPerPage).keys()]);
  const [postNumber, setPostNumber] = useState(photosPerPage);

  function handleScroll() {
    var isAtBottom = document.documentElement.scrollHeight - document.documentElement.scrollTop <= document.documentElement.clientHeight;

    if (isAtBottom) {
      // Load next posts
      postNumber += photosPerPage;
      setPosts(prevPosts => [...prevPosts, ...Array(photosPerPage).keys()]);
      setPostNumber(postNumber); // Update postNumber in state
    }
  }

  window.addEventListener("scroll", handleScroll);

  return (
    <div>
      {posts.map((item, i) => (
        <p key={i}>{i}</p>
      ))}
    </div>
  );
};

export default Photos;