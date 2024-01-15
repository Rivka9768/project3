const UserInfo = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  return (
    <>
      <h1>info</h1>
      <p>id: {currentUser.id}</p>
      <p>name: {currentUser.name}</p>
      <p>username: {currentUser.username}</p>
      <p>email: {currentUser.email}</p>
      <label >address:</label>
      <p>street: {currentUser.address.street}</p>
      <p>suite: {currentUser.address.suite}</p>
      <p>city: {currentUser.address.city}</p>
      <p>zipcode: {currentUser.address.zipcode}</p>
      <label >geo</label>
      <p>lat: {currentUser.address.geo.lat}</p>
      <p>lng: {currentUser.address.geo.lng}</p>
      <p>phone: {currentUser.phone}</p>
      <p>website: {currentUser.website}</p>
      <label >company</label>
      <p>name: {currentUser.company.name}</p>
      <p>catchPhrase: {currentUser.company.catchPhrase}</p>
      <p>bs: {currentUser.company.bs}</p>
      
  
    </>
  )
}
export default UserInfo