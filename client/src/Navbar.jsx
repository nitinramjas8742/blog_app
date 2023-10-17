import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import './Navbar.css'
import { userContext } from './App'
import axios from 'axios'
function Navbar() {
    const user = useContext(userContext)
    const navigate = useNavigate()
    const handleLogout = () => {
        window.location.href='/logout'
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
            {
            user.username ?
            <div>
                <Link to = "/mypost" class="link">MyPost</Link>
            </div>
            :
            <></>
            }
            <Link class="link" to="/aboutus">About Us</Link>
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

