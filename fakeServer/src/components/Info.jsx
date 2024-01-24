import React, { useContext, useEffect } from "react";
import { UserContext } from '../App'
const Info = () => {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  return (
    <>
      <div>
        <h1>info</h1>
        <p>id: {currentUser.id}</p>
        <p>name: {currentUser.name}</p>
        <p>username: {currentUser.username}</p>
        <p>email: {currentUser.email}</p>
        <label >address:</label>
        {console.log(currentUser)}

        {console.log(currentUser.street)}
        <p>street: {currentUser.street}</p>
        <p>suite: {currentUser.suite}</p>
        <p>city: {currentUser.city}</p>
        <p>zipcode: {currentUser.zipcode}</p>
        <label >geo</label>
        <p>lat: {currentUser.lat}</p>
        <p>lng: {currentUser.lng}</p>
        <p>phone: {currentUser.phone}</p>
        <p>website: {currentUser.website}</p>
        <label >company</label>
        <p>name: {currentUser.companyName}</p>
        <p>catchPhrase: {currentUser.catchPhrase}</p>
        <p>bs: {currentUser.bs}</p>
      </div>
    </>
  )
}
export default Info