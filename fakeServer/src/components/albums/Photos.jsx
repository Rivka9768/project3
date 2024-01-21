import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from 'react-infinite-scroller';
const Photos = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const[isAdd,setIsAdd]=useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [a,sa]=useState()
  let start=0;




 const getPhotos = (setItems, items) => {
    fetch(`http://localhost:3000/photos?albumId=${id}&&_start=${start}&_limit=10`)
      .then(async response => {
        const data = await response.json();
        debugger
        response.ok && (setItems([...items, ...data]),        items.length >=40 ? setHasMore(false) : setHasMore(true))
        console.log(items)
      })
      start+=10;
  }
  useEffect(() => {
    getPhotos(setItems, items)
  }, [])
  return (
    <>
<h1>photos</h1>

<button onClick={() => setIsAdd(!isAdd)}>add photo</button>
{isAdd && <AddPhoto albumId={id} setIsAdd={setIsAdd} getPhotos={getPhotos} />}
         
    <InfiniteScroll
      pageStart={0}
      loadMore={()=>{getPhotos(setItems, items)
      
      
      }}
      hasMore={hasMore}
      loader={<div className="loader" key={0}>Loading ...</div>} 
      >
      <div style={{ minHeight: "100vh" }}>
        {items.map((photo,i) => (
          <img key={i} src={photo.thumbnailUrl} />
        ))}
      </div> 
    </InfiniteScroll>
</>
  )

}
export default Photos;






// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import InfiniteScroll from 'react-infinite-scroller';

// const Photos = () => {
//   const { id } = useParams();
//   const [items, setItems] = useState([]);
//   const [isAdd, setIsAdd] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [start, setStart] = useState(0); // השתמש ב-useState כדי לנהל את start

//   const getPhotos = () => {
//     debugger
//     fetch(`http://localhost:3000/photos?albumId=${id}&_start=${start}&_limit=10`)
//       .then(async response => {
//         const data = await response.json();
//         if (response.ok) {
//           setItems((prevItems) => [...prevItems, ...data]); // השתמש בפונקציה כדי לעדכן את items
//           setHasMore(data.length === 10); // עדכן hasMore על סמך כמות הפריטים שהתקבלו
//         }
//       })
//       setStart(start + 10); // קדם את start לאחר הקריאה, גם במקרה של שגיאה
  
//     };

//   useEffect(() => {
//     getPhotos();
//   }, []);

//   return (
//     <>
//       <h1>photos</h1>

//       <button onClick={() => setIsAdd(!isAdd)}>add photo</button>
//       {isAdd && <AddPhoto albumId={id} setIsAdd={setIsAdd} getPhotos={getPhotos} />}

//       <InfiniteScroll
//         pageStart={0}
//         loadMore={getPhotos} // העבר את הפונקציה ישירות ל-loadMore
//         hasMore={hasMore}
//         loader={<div className="loader" key={0}>Loading ...</div>}
//       >
//         <div style={{ minHeight: "100vh" }}>
//           {items.map((photo, i) => (
//             <img key={i} src={photo.thumbnailUrl} />
            
//           ))}
//         </div>
//         {console.log(items)}
//       </InfiniteScroll>
//     </>
//   );
// };

// export default Photos;



