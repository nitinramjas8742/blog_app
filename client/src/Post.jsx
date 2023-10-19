import axios from 'axios'
import React from 'react'
import './Post.css'
import {useParams,Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
function Post() {
    const {id} = useParams()
    const [post,setPost] = useState({})
    useEffect(() => {
         axios.get(`${import.meta.env.VITE_API_URL}/getpostbyid/${id}`,{
          headers:{
          'token':localStorage.getItem("token"),
           }
        },)
         .then((results) => {
          if(!results.data){
            window.location.href='/myposts';
            return;
          }
          setPost(results.data)

        })
         .catch(err => console.log(err))
        },[]) 
      const handledelete = () =>{
         axios.delete(`${import.meta.env.VITE_API_URL}/delete/${id}`,{
          headers:{
            'token':localStorage.getItem("token"),
             }
         }).then((res) => {
          console.log(res);
            if(res.data.status=='success')
            {
              window.location.href='/MyPost'
            }
         }).catch((err)=>{
          console.log(err);
         })
      } 
  return (
    <div className='post-card'>
  <div className='post-card-content'>
    <img src={`${import.meta.env.VITE_API_URL}/Images/${post.file}`} alt="" className='post-card-image' />
    <h2 className='post-card-title'>{post.title}</h2>
    <p className='post-card-description'>{post.description}</p>
    
  </div>
</div>

  )
}

export default Post
