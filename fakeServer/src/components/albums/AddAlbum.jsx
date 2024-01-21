import React,{useEffect,useContext} from "react";
import { UserContext } from '../../App'

const AddAlbum=({setIsAdd,getAlbums})=>{
    const [currentUser, setCurrentUser] = useContext(UserContext);
   let id;
   useEffect(() => {
    fetch(`http://localhost:3000/nextIds/albums`)
        .then(async response => {
            const data = await response.json();
            if (response.ok) {
                id = data.nextId;
                fetch(`http://localhost:3000/nextIds/albums`, {
                    method: 'PATCH',
                    body: JSON.stringify({ nextId: data.nextId + 1 })
                });
            } else alert("oops.... something went wrong");
        })
}, [])
   const addNewAlbum=(element)=>{
      element.preventDefault();
      const album={
         userId:currentUser.id,
         id:id,
         title:element.target[0].value,
      }
      console.log(album);

      fetch(`http://localhost:3000/albums`,{
         method:'POST',
         body:JSON.stringify(album)
         }).then(response=>{
               response.ok?setIsAdd(false):alert("oops somthing went wrong... please try again!")})
              getAlbums();
   }
   
   
   
   return(
      <>


         <h1>add</h1>
             <form onSubmit={addNewAlbum}>
                <input type="text" placeholder="title..." /><br />
                <input type="submit" value='add album' /><br />
           </form>

      </>
   )
}


export default AddAlbum
