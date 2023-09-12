import React, { useEffect,useState} from 'react'
import axios from 'axios'

import { Link } from 'react-router-dom'
function Home() {
    if(!localStorage.getItem('token'))
    {
        window.location.href='/';
        return
    }
  const [posts,setPosts] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3000/getposts',{
      headers:{
      'token':localStorage.getItem("token"),
      }
    })
    .then(posts => {
      setPosts(posts.data)
    })
    .catch(err => console.log(err))
  },[])
  return (
    <div className='posts_container'>
  {posts.map(post => (
    <Link to={`/post/${post._id}`} className='post' key={post._id}>
      <div className='card'>
        <img src={`http://localhost:3000/Images/${post.file}`} alt="" className='card_image' />
        <div className='card_text'>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

  )
}

export default Home