import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AddComment from './AddComment';
const Comments = () => {

    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const [isAdd, setIsAdd] = useState(false)
    useEffect(() => {
        fetch(`http://localhost:3000/comments?postId=${id}`)
            .then(response => response.json())
            .then(response => (response.length) ? setComments(response) : alert("notExist"))
    }, [])

    return (
        <>

            <button onClick={() => setIsAdd(!isAdd)}>add comment</button>
            {isAdd && <AddComment setIsAdd={setIsAdd} />}
            <h3>comments for post id {id}</h3>
            {comments.map((comment, index) => <div key={index}>
                <p>postId: {comment.postId}</p>
                <p>id: {comment.id}</p>
                <p>name: {comment.name}</p>
                <p>email: {comment.email}</p>
                <p>body: {comment.body}</p>
                <br />

            </div>)}

        </>
    )
}
export default Comments