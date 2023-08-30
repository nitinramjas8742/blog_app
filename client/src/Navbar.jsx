import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { userContext } from './App'
import axios from 'axios'
function Navbar() {
    const user = useContext(userContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        axios.get('http://127.0.0.1:3001/logout')
        .then(res=>{
               if(res.data === "Success")
               navigate(0) 
        })
        .catch(err => console.log(err))
    }
  return (
     <>
        <div class="navbar-header">
        <div class="logo">
            <h3>Blog App</h3>
        </div>
        <div class="nav-links">
            <Link to = "/"class="link">Home</Link>
            {
                user.username ?
                <Link to = "/create" class="link">Create</Link>
                : <></>
            }
            
            <a class="link" href="/about">About Us</a>
        </div>
        {
            user.username ?
            <div>
                <input type = "button" onClick={handleLogout} value = "Logout" className='btn_input'/>
            </div>
            :
            <div class="user-section">
            <h5><Link to="/register" className='link'>Register/Login</Link></h5>
            </div>
        }
    </div>
     </>
  )
}

export default Navbar

