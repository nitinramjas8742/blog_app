import { createContext, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './Navbar';
import { BrowserRouter,Routes,Route} from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Home from './Home';
import axios from 'axios';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import Post from './Post';
import Logout from './Logout';
import MyPost from './MyPost';
import About from './About';
import Edit_del_mypost from './Edit_del_mypost';
export const userContext = createContext()
function App() {
  const [user,setUser] = useState({});
  axios.defaults.withCredentials = true;
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_URL}/`,{
      headers:{
        token:localStorage.getItem("token")
      },
      
    })
    .then(user =>{
      setUser(user.data)
    })
    .catch(err => console.log(err))
  },[])
  return (
    <userContext.Provider value ={user}>
     <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/aboutus' element={<About/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element = {<Home/>}></Route>
        <Route path='/create' element = {<CreatePost/>}></Route>
        <Route path='/post/:id' element = {<Post/>}></Route>
        <Route path='/ed_post/:id' element = {<Edit_del_mypost/>}></Route>
        <Route path='/editpost/:id' element = {<EditPost/>}></Route>
        <Route path='/logout' element = {<Logout/>}></Route>
        <Route path='/mypost' element = {<MyPost/>}></Route>
       </Routes>
      </BrowserRouter>
      </userContext.Provider>
  )
}

export default App
