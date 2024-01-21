import React from "react";


const AddPhoto=({albumId,setIsAdd,getPhotos})=>{
   const user = JSON.parse(localStorage.getItem("currentUser"));
   
   const addNewPhoto=(element)=>{
      element.preventDefault();
      const photo={
         albumId:albumId,
         id:"55205",
         name:element.target[0].value,
        email:user.email,
         body:element.target[1].value
      }
      console.log(photo);

      fetch(`http://localhost:3000/photos`,{
         method:'POST',
         body:JSON.stringify(photo)
         }).then(response=>{
               response.ok?setIsAdd(false):alert("oops somthing went wrong... please try again!")})
              getPhotos();
   }
   
   
   
   return(
      <>


         <h1>add</h1>

             <form onSubmit={addNewPhoto}>
                <input type="text" placeholder="name..." /><br />
                <textarea cols="25" rows="8" placeholder="body..."/><br/>
                <input type="submit" value='add photo' /><br />
           </form>

      </>
   )
}


export default AddPhoto
