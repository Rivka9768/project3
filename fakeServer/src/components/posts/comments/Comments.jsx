import React, { useState, useEffect,useContext } from "react";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import { MdDelete, MdModeEdit } from "react-icons/md";
import UpdateComment from "./UpdateComment";
import { UserContext } from '../../../App'
const Comments = () => {
    const [currentUser, setCurrentUser] = useContext(UserContext);
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [isAdd, setIsAdd] = useState(false)
const[isUpdate,setIsUpdate]=useState(-1)

    const getComments = () => {
        fetch(`http://localhost:3000/comments?postId=${id}`)
            .then(response => response.json())
            .then(response => (response.length) ? setComments(response) : alert("notExist"))
    }
    useEffect(() => {
        getComments()
    },  [currentUser])
    const remove = (id) => {
        fetch(`http://localhost:3000/comments/${id}`, {
          method: 'DELETE'
        })
          .then(response => {
            response.ok ? getComments() : alert("oops somthing went wrong... please try again!");
          })
      }
    return (
        <>

            <button onClick={() => setIsAdd(!isAdd)}>add comment</button>
            {isAdd && <AddComment postId={id} setIsAdd={setIsAdd} getComments={getComments} />}
            <h3>comments for post id {id}</h3>
            {comments.map((comment, index) => <div key={index}>
                <p>postId: {comment.postId}</p>
                <p>id: {comment.id}</p>
                <p>email: {comment.email}</p>
                {isUpdate != index ?<>
                <p>name: {comment.name}</p>
                <p>body: {comment.body}</p>
                </>:<UpdateComment setIsUpdate={setIsUpdate} comment={comment} getComments={getComments}/>}
                <br />
                {currentUser.email===comment.email&&<>
                <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
                <button disabled={isUpdate === index} onClick={() => remove(comment.id)}><MdDelete /></button>
                </>}
            </div>)}

        </>
    )
}
export default Comments