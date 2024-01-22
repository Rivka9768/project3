
import React, { useState, useEffect,useContext } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import SearchPosts from "./SearchPosts";
import { Link } from "react-router-dom";
import UpdatePost from "./UpdatePost";
import  Style from './loader.module.css'
import { UserContext } from '../../App'
const Posts = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [exist, setExist] = useState(false);
  const [posts, setPosts] = useState([]);
  const [showBody, setShowBody] = useState(-1)
  let [allPosts, setAllPosts] = useState([])
  const [isUpdate, setIsUpdate] = useState(-1);
  const getPosts = () => {
    fetch(`http://localhost:3000/posts?userId=${currentUser.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok ? setExist(true) : setExist(false);
        setPosts(data);
        setAllPosts(data)
      })
  }
const[loading,setLoading]=useState(true)
  useEffect(() => {
    getPosts()

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    
  },  [currentUser])


  const remove = (id) => {

    fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        response.ok ? getPosts() : alert("oops somthing went wrong... please try again!");
      })
  }






  return (
    <>

      <h1>Posts</h1>
      <SearchPosts setPosts={setPosts} allPosts={allPosts} posts={posts} />
      {loading?<div className={Style.loader}>
    <div className={Style.circle}></div>
    <div className={Style.circle}></div>
    <div className={Style.circle}></div>
    <div className={Style.circle}></div>
</div> : < >
        {posts.map((post, index) =>
          <div style={{ fontWeight: (showBody === index) && 'bold' }} key={index}>
            <span>ID: {post.id}</span>
            {(isUpdate != index) ? <>
              <span>TITLE: {post.title}</span>
              <span>BODY: {post.body}</span>
            </> : <UpdatePost post={post} getPosts={getPosts} setIsUpdate={setIsUpdate}/>}

            {showBody === index && <>
              <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
              <Link to={`./${post.id}/comments`}>comments</Link>
            </>

            }
            <button onClick={() => setShowBody(prevShowBody => prevShowBody === index ? -1 : index)}> {showBody === index ? <FaEyeSlash /> : <FaEye />}</button>



            <button disabled={isUpdate === index} onClick={() => remove(post.id)}><MdDelete /></button>
          </div>
        )}</>}
    </>
  )
}
export default Posts





