import React, { useState } from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Register() {
  const [username,setUsername] = useState()
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3000/register',{username,email,password})
    .then(res => navigate('/login'))
    .catch(err => console.log(err))
  }
  return (
    <div className="signup-container">
    <h2>Sign Up</h2>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" id="username" placeholder='Enter Username'
        onChange={e => setUsername(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" placeholder='Enter Email'
         onChange={e => setEmail(e.target.value)} />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" placeholder='**********'
         onChange={e => setPassword(e.target.value)} />
      </div>
      <button className="signup-button">Sign up</button>
    </form>
    <p className="login-message"><b>If you already have an account?</b></p>
    <button className="login-button"><Link to='/login' className='lk'>Login</Link></button>
  </div>
  )
}

export default Register
