import axios from 'axios'
import React from 'react'
import './Edit_del_mypost.css'
import {useParams,Link} from 'react-router-dom';
import { useState,useEffect } from 'react';
function Edit_del_mypost() {
    const {id} = useParams()
    const [post,setPost] = useState({})
    useEffect(() => {
         axios.get(`http://localhost:3000/getpostbyid/${id}`,{
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
         axios.delete(`http://localhost:3000/delete/${id}`,{
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
    <img src={`http://localhost:3000/Images/${post.file}`} alt="" className='post-card-image' />
    <h2 className='post-card-title'>{post.title}</h2>
    <p className='post-card-description'>{post.description}</p>
    <Link to={`/editpost/${post._id}`} className='post-card-link'>Edit</Link>
    <button className='post-card-button' onClick={handledelete}>Delete</button>
  </div>
</div>

  )
}

export default Edit_del_mypost