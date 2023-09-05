import React, { useEffect,useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
function Home() {
  const [posts,setPosts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/getallposts',{
      headers:{
      'token':localStorage.getItem("token"),
      'Content-type':'multipart/form-data'
      }
    })
    .then(posts => {
      setPosts(posts.data)
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div className='posts_container'>
      {
      posts.map(post => (
        <Link to={`/post/${post._id}`} className='post'>
          <img src= {`http://localhost:3000/Images/${post.file}`} alt=""/>
          <div className='post_text'>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
          </Link>
      ))
     }
    </div>
  )
}

export default Home
