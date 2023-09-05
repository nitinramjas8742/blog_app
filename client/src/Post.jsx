import axios from 'axios'
import React from 'react'
import {useParams,Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
function Post() {
    const {id} = useParams()
    const [post,setPost] = useState({})
    useEffect(() => {
         axios.get(`http://localhost:3000/getpostbyid/${id}`,{
          headers:{
          'token':localStorage.getItem("token"),
           }
        },)
         .then(results => setPost(results.data))
         .catch(err => console.log(err))
        },[]) 
  return (
    <div>
        <div>
            <img src={`http://localhost:3000/Images/${post.file}`} alt="" />
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <Link to={`/editpost/${post._id}`}>Edit</Link>
            <button>Delete</button>
        </div>
    </div>
  )
}

export default Post
