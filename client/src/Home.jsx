import React, { useEffect,useState} from 'react'
import axios from 'axios'
import './Home.css'
import { Link } from 'react-router-dom'
function Home() {
  const [posts,setPosts] = useState([])
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/getallposts`,{
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
  {posts.map(post => (
    <Link to={`/post/${post._id}`} className='post_card' key={post._id}>
      <div className='card'>
        <img src={`${import.meta.env.VITE_API_URL}/Images/${post.file}`} alt="" className='card_image' />
        <div className='card_content'>
          <h2 className='card_title'>{post.title}</h2>
          <p className='card_description'>{post.description}</p>
        </div>
      </div>
    </Link>
  ))}
</div>

  )
}

export default Home
