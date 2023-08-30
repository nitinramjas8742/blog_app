const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const UserModel = require('./models/UserModel')
const app = express()
require("dotenv").config();
const PostModel = require('./models/PostModel')
const localStorage = require("node-localstorage");
app.use(express.json())
app.use(cors({
    origin: ["http://127.0.0.1:5173"],
    methods: ["GET","POST","PUT","DELETE"],
    credentials : true
}))
app.use(cookieParser())
app.use(express.static('public'))
mongoose.connect(process.env.MONGO_URL,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function (err) {
  if(err){
    console.log(err);
  }
  console.log("Connected successfully");
});
const verifyUser = (req,res,next) => {
   const token = req.header("token");
   if(!token)
   return res.json("token missing")
  else
  {
    jwt.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
         if(err)
         {
           return res.json("The token is wrong")
         }
         else
         {
          req.email = decoded.email;
          req.username = decoded.username;
          next()
         }
    })
  }
}
app.get('/',verifyUser,(req,res) => {
     return res.json({email:req.email,username:req.username})
})
app.post('/register',(req,res) =>{
    const {username,email,password} = req.body;
    bcrypt.hash(password,10)
    .then(hash => {
       UserModel.create({username,email,password:hash})
      .then(user => res.json(user))
      .catch(err => res.json(err))
    }).catch(err => console.log(err))
})
app.post('/login',(req,res) =>{
  const {email,password} = req.body;
  UserModel.findOne({email: email})
  .then(user => {
    if(user)
    {
      bcrypt.compare(password,user.password,(err,response) => {
        if(response)
        {
             //var localStorage = new localStorage('./scratch');
             const token = jwt.sign({email : user.email,username: user.username},process.env.JWT_SECRET,{expiresIn: '1d'})
             return res.status(200).json({status:"Success",token:token});
            }
        else{
              return res.json("Password is incorrect");
        }
      })
    }
    else{
      res.json("User not exist")
    }
  })
})
const storage = multer.diskStorage({
  destination : './public/Images',
  filename : (req,file,cb) => {
    cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({
  storage : storage
})
app.post('/create',verifyUser,upload.single('file'),(req,res) =>{
  
   PostModel.create({
    title: req.body.title,
    description: req.body.description,
    file: req.file.filename
  })
  .then(
    result => res.json("Success")
  )
  .catch(err => res.json(err))
})
app.get('/getposts',(req,res) =>{
   PostModel.find()
   .then(posts => res.json(posts))
   .catch(err => res.json(err))
})
app.get('/getpostbyid/:id',(req,res) => {
    const id = req.params.id
    PostModel.findById({_id : id})
    .then(post => res.json(post))
    .catch(err => console.log(err))
})
app.get('/logout',(req,res) =>{
      res.clearCookie('token')
      return res.json("Success")
})
app.listen(3001, () => {
  console.log("Server is running");
});
