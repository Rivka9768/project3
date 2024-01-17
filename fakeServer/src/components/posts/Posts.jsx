
import React, { useState, useEffect } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SearchPosts from "./SearchPosts";
import Comments from "./comments/Comments"
import { Link } from "react-router-dom";
const Posts = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [exist, setExist] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showBody, setShowBody] = useState(-1)
  let [allPosts, setAllPosts] = useState([])
  const [isUpdate, setIsUpdate] = useState(-1);
  const getPosts = () => {
    fetch(`http://localhost:3000/posts?userId=${user.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok ? setExist(true) : setExist(false);
        setPosts(data);
        setAllPosts(data)
      })
  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <>
      <h1>Posts</h1>
<<<<<<< HEAD
      <SearchPosts />
=======
      <SearchPosts setPosts={setPosts} allPosts={allPosts} posts={posts}/>
>>>>>>> aba49e43618bf1848df9f4c106da11b8cea117b0
      {!exist ? <AiOutlineLoading3Quarters /> : < >
        {posts.map((post, index) =>
          <div style={{ fontWeight: (showBody === index) && 'bold' }} key={index}>
            <span>ID: {post.id}</span>
            <span>TITLE: {post.title}</span>
<<<<<<< HEAD
            {showBody === index && <><span>BODY: {post.body}</span><br /><Link to={`./${post.id}/comments`}>comments</Link></>}
=======
            {showBody === index && <span>BODY: {post.body}</span>
                        && <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                        
            }
>>>>>>> aba49e43618bf1848df9f4c106da11b8cea117b0
            <button onClick={() => setShowBody(prevShowBody => prevShowBody === index ? -1 : index)}> {showBody === index ? <FaEyeSlash /> : <FaEye />}</button>


            <button disabled={isUpdate === index} onClick={() => remove(todo.id)}><MdDelete /></button> 
          </div>
        )}</>}
    </>
  )
}
export default Posts





