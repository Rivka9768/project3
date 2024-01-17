import React from "react";

const AddComment=()=>{
    const addNewComment=()=>{
     
        

        
    }

{/* <p>postId: {comment.postId}</p>
<p>id: {comment.id}</p>
<p>name: {comment.name}</p>
<p>email: {comment.email}</p>
<p>body: {comment.body}</p> */}

    }
    return(
        <>
        <h1>add</h1>

        <form onSubmit={addNewComment}>
                <input type="text" placeholder="name..." /><br />
                <input type="text" placeholder="body..." /><br />
                <input type="submit" value='add todo' /><br />
            </form>
 
        </>
    )
}
export default AddComment
