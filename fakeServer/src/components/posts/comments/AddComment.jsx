import React from "react";


const AddComment=({postId,setIsAdd,getComments})=>{
   const user = JSON.parse(localStorage.getItem("currentUser"));
   
   const addNewComment=(element)=>{
      element.preventDefault();
      const comment={
         postId:postId,
         id:"55205",
         name:element.target[0].value,
        email:user.email,
         body:element.target[1].value
      }
      console.log(comment);

      fetch(`http://localhost:3000/comments`,{
         method:'POST',
         body:JSON.stringify(comment)
         }).then(response=>{
               response.ok?setIsAdd(false):alert("oops somthing went wrong... please try again!")})
              getComments();
   }
   
   
   
   return(
      <>


         <h1>add</h1>

             <form onSubmit={addNewComment}>
                <input type="text" placeholder="name..." /><br />
                <textarea cols="25" rows="8" placeholder="body..."/><br/>
                <input type="submit" value='add comment' /><br />
           </form>

      </>
   )
}


export default AddComment






































//  import React from "react";

//  const AddComment = ({ setIsAdd,postId }) => {
// //     const user = JSON.parse(localStorage.getItem("currentUser"));
   

// //     // const addNewComment = (element) => {
// //     //     element.preventDefault();
// //     // const comment = {
// //     //     postId: postId,
// //     //     id: "25",
// //     //     name: element.target[0].value,
// //     // email: user.email,
// //     // body:element.target[1].value
// //     // };
    
// //     // console.log(comment);
    
// //     // fetch('http://localhost:3000/comments', {
// //     //         method: 'POST',
// //     //     body: JSON.stringify(comment),
    
// //     //         .then(response => {
// //     //     (!response.ok) ? alert("oops somthing went wrong... please try again!") : setIsAdd(false)
// //     //        })
    
// //     // }


//    return ()
// //         <>
// //             <h1>add</h1>

// //             <form onSubmit={addNewComment}>
// //                 <input type="text" placeholder="name..." /><br />
// //                 <input type="text" placeholder="body..." /><br />
// //                 <input type="submit" value='add todo' /><br />
// //             </form>

// //         </>
     
//  } 
//  export default AddComment