import React,{useState,useEffect} from "react";
import SearchAlbums from "./SearchAlbums";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Link } from "react-router-dom";

const Albums = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [exist, setExist] = useState(false);
  const [albums, setAlbums] = useState([]);
  let [allAlbums, setAllAlbums] = useState([])
  const getAlbums = () => {
    fetch(`http://localhost:3000/albums?userId=${user.id}`)
      .then(async response => {
        const data = await response.json();
        response.ok ? setExist(true) : setExist(false);
        setAlbums(data);
        setAllAlbums(data)
      })
  }

  useEffect(() => {
    getAlbums()
  }, [])

  return (
        <>
      <h1>Albums</h1>
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