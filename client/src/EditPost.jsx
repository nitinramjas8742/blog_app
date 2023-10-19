import React, { useState,useEffect } from 'react'
import './CreatePost.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function EditPost() {
  if (!localStorage.getItem('token')) {
    window.location.href = '/'
    return
  }
  const [title, setTitle] = useState()
  const [description, setDescription] = useState()
  const [file, setFile] = useState()
  const { id } = useParams()
  const [post,setPost] = useState({
    title:'',
    description:''
  })
  const handleSubmit = (e) => {
    console.log(id);
    e.preventdefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('description', description)
    axios.post(`${import.meta.env.VITE_API_URL}/editPost/${id}`, formData, {
      headers: {
        'token': localStorage.getItem("token"),
      },
    })  //we need form data in case of file uploading
      .then(res => {
        if (res.data === "Success") {
          window.location.href = "/"
        }
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
    
    axios.get(`${import.meta.env.VITE_API_URL}/getpostbyid/${id}`,{
          headers:{
          'token':localStorage.getItem("token"),
           }
        },)
         .then((results) => {setPost(results.data)
           console.log(results);
        })
         .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <div class="form-container">
        <form action="" onSubmit={handleSubmit}>
          <label for="text_input">Create Post</label>
          <input type="text" name="text_input" id="text_input" defaultValue={post.title} placeholder='Enter title' onChange={e => setTitle(e.target.value)} />
          <label for="desc">Description:</label>
          <textarea name="desc" id="desc" cols="30" rows="10" defaultValue={post.description} placeholder='Enter Decription' onChange={e => setDescription(e.target.value)}></textarea>
          <label for="file_upload">File Upload:</label>
          <input type="file" name="file_upload" id="file_upload" onChange={e => setFile(e.target.files[0])} />
          <button type="submit">Post</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost