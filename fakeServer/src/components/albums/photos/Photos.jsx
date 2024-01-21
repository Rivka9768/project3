// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import InfiniteScroll from 'react-infinite-scroller';
// const Photos = () => {
//   const { id } = useParams();
//   const [items, setItems] = useState([]);
//   const[isAdd,setIsAdd]=useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [a,sa]=useState()
//   let start=0;
//   let end=10;

//  const getPhotos = (setItems, items) => {
//     fetch(`http://localhost:3000/photos?albumId=${id}&&_start=${start}&&_end=${end}`)
//       .then(async response => {
//         const data = await response.json();
//         debugger
//         response.ok && (setItems([...items, ...data]),        items.length >=40 ? setHasMore(false) : setHasMore(true))
//         console.log(items)
//       })
//       start+=10;
//       end+=10;
//   }
//   useEffect(() => {
//     getPhotos(setItems, items)
//   }, [])
//   return (
//     <>
//       <h1>photos</h1>

//       <button onClick={() => setIsAdd(!isAdd)}>add photo</button>
//       {isAdd && <AddPhoto albumId={id} setIsAdd={setIsAdd} getPhotos={getPhotos} />}

//       <InfiniteScroll
//         pageStart={0}
//         loadMore={()=>{getPhotos(setItems, items)


//         }}
//         hasMore={hasMore}
//         loader={<div className="loader" key={0}>Loading ...</div>} 
//         >
//         <div style={{ minHeight: "100vh" }}>
//           {items.map((photo,i) => (
//             <img key={i} src={photo.thumbnailUrl} />
//           ))}
//         </div> 
//       </InfiniteScroll>
//     </>
//   )
// }
// export default Photos;






import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
import AddPhoto from "./AddPhoto";
import UpdatePhoto from "./UpdetePhoto";
import { MdDelete, MdModeEdit } from "react-icons/md";

const Photos = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(-1);
  const [hasMore, setHasMore] = useState(true);
  const [start, setStart] = useState(0); // השתמש ב-useState כדי לנהל את start
  const [end, setEnd] = useState(10);
  const [a, b] = useState(true)

  const getPhotos = () => {

    setTimeout(() => {
      fetch(`http://localhost:3000/photos?albumId=${id}&_start=${start}&_end=${end}`)
        .then(async response => {
          const data = await response.json();
          if (response.ok) {
            setItems((prevItems) => [...prevItems, ...data]); // השתמש בפונקציה כדי לעדכן את items
            setHasMore(data.length === 10); // עדכן hasMore על סמך כמות הפריטים שהתקבלו
          }
        })
        .finally(() => { setStart(start + 10), setEnd(end + 10) }, console.log(end)); // קדם את start לאחר הקריאה, גם במקרה של שגיאה

    }, 400);
  };



  const remove = (id) => {
    fetch(`http://localhost:3000/photos/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        response.ok ? getPhotos() : alert("oops somthing went wrong... please try again!");
      })
  }
  // useEffect(() => {

  //   getPhotos();
  //   setEnd(10);
  //   setStart(0);
  //   setItems([]) ;
  //     console.log(items)
  // }, []);

  return (
    <>
      <h1>photos</h1>
      {a && (getPhotos(), b(false))}
      <button onClick={() => setIsAdd(!isAdd)}>add photo</button>
      {isAdd && <AddPhoto albumId={id} setIsAdd={setIsAdd} getPhotos={getPhotos} setEnd={setEnd} setStart={setStart} />}

      <InfiniteScroll
        pageStart={0}
        loadMore={getPhotos}
        hasMore={hasMore}
        loader={<div className="loader" key={0}>Loading ...</div>}
      >
        <div style={{ minHeight: "100vh" }}>
          {items.map((photo, index) => (
            <span key={index} >
              <img src={photo.thumbnailUrl} />

              <button onClick={() => setIsUpdate(prevIsUpdate => prevIsUpdate === -1 ? index : -1)}><MdModeEdit /></button>
              <button disabled={isUpdate === index} onClick={() => remove(photo.id)}><MdDelete /></button>
                {isUpdate === index &&
                <UpdatePhoto setIsUpdate={setIsUpdate} photo={photo} getPhotos={getPhotos} />}
            </span>
          ))}
        </div>
        {console.log(items)}
      </InfiniteScroll>
    </>
  );
};

export default Photos;



