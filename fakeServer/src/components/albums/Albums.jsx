import React,{useState,useEffect,useContext} from "react";
import SearchAlbums from "./SearchAlbums";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import AddAlbum from "./AddAlbum";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from '../../App'

const Albums = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  const [exist, setExist] = useState(false);
  const [albums, setAlbums] = useState([]);
  const[isAdd,setIsAdd]=useState(false)
  let [allAlbums, setAllAlbums] = useState([])
  const getAlbums = () => {
    fetch(`http://localhost:3000/albums?userId=${currentUser.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok ? setExist(true) : setExist(false);
        setAlbums(data);
        setAllAlbums(data)
      })
  }

  useEffect(() => {
    getAlbums()
  },  [currentUser])

  return (
        <>
      <h1>Albums</h1>
      <button onClick={() => setIsAdd(!isAdd)}>add album</button>
      {isAdd && <AddAlbum  setIsAdd={setIsAdd} getAlbums={getAlbums}/>}
      <SearchAlbums setAlbums={setAlbums} allAlbums={allAlbums} albums={albums} />
      {!exist ? <AiOutlineLoading3Quarters /> : < >
        {albums.map((album, index) =>
          <Link key={index} to={`./${album.id}/photos`}>
            <span>ID: {album.id}</span>
            <span>TITLE: {album.title}</span>
          </Link>
        )}</>}
      </>
    )
}
      export default Albums