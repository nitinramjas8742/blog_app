import React, { useState } from 'react'
import './CreatePost.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function EditPost() {
    const [title,setTitle] = useState()
    const [description,setDescription] = useState()
    const [file,setFile] = useState()
    const {id} = useParams()
  
    const handleSubmit = (e) =>{
       e.preventdefault()
       const formData =  new FormData()
       formData.append('title',title)
       formData.append('description',description)
       axios.post('http://localhost:3001/editPost',formData,{
        headers:{
        'token':localStorage.getItem("token"),
        
        },
      })  //we need form data in case of file uploading
    .then(res => {
      if(res.data === "Success")
      {
          window.location.href = "/"
      }
    })
    .catch(err => console.log(err))
    }
    useEffect(() => {
        axios.get('http://localhost:3001/getposts')
        .then(posts => {
          setTitle
        })
        .catch(err => console.log(err))
      },[])
  return (
    <div>
      <div class="form-container">
        <form action="" onSubmit={handleSubmit}>
            <label for="text_input">Create Post</label>
            <input type="text" name="text_input" id="text_input" placeholder='Enter title' onChange={e => setTitle(e.target.value)}/>
            <label for="desc">Description:</label>
            <textarea name="desc" id="desc" cols="30" rows="10" placeholder='Enter Decription'  onChange={e => setDescription(e.target.value)}></textarea>
            <label for="file_upload">File Upload:</label>
            <input type="file" name="file_upload" id="file_upload"  onChange={e => setFile(e.target.files[0])}/>
            <button type="submit">Post</button>
        </form>
      </div>
    </div>
  )
}

export default EditPost
