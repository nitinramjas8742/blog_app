import React,{useState,useEffect} from 'react'
import './Login.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
function Login() {
  if(localStorage.getItem('token'))
  {
    window.location.href='/'
    return
  }
  const [email,setEmail] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault()
    axios.post('http://localhost:3000/login',{email,password})
    .then(res => {
      if(res.data.status === "Success")
      {
        console.log(res.data);
        localStorage.setItem("token",res.data.token);
        window.location.href = "/"
      }
    })
    .catch(err => console.log(err))
  }
  return (
    <div className="login-container">
    <h2>Login</h2>
    <form className="login-form"  onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" id="username" onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" id="password" onChange={e => setPassword(e.target.value)}/>
      </div>
      <button className="login-button">Login</button>
    </form>
    <p className="signup-message">Don't have an account?</p>
    <button className="signup-button"><Link to='/register' className='lk'>Sign up</Link></button>
  </div>
  )
}

export default Login
