import React, { useEffect, useState } from 'react'
import {Navigate} from 'react-router-dom'
function NavBar() {
  const [username,setUsername] = useState(null)
 const  [passowrd,setPassowrd] = useState(null)

 function goToHome(){

    return <Navigate to={'/'} />
 
 }
  useEffect (() => {
    fetch('http://localhost:9000/profile',{credentials:'include'}).then(response => {
    response.json().then(userInfo=>{
setUsername(userInfo.username);})
    })
    },[])

    function logout(){
      fetch('http://localhost:9000/logout',{credentials:'include',
    method:'POST'})}
  return (
    <div id="navbar">
    <a  id="logo" href='/'> <img src="" alt="logo"/> </a>
    
    {username && <><a href='/create'>Create new post</a>
    <a onClick={logout} href=''>logout</a> 
    </>}
  {!username && <><a href='/login'>login</a> <a href='/register'>register</a></>}
    </div>
  )
}

export default NavBar