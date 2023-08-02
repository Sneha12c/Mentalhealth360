const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/user');
const Post = require('./models/post');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const multer = require("multer");
const upload = multer({ dest: 'uploads/' });
const fs = require('fs');
const app = express();

const salt = bcrypt.genSaltSync(10);
const secret = 'avshjhjsdjdhj76383hbfndsb237';

app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect("mongodb+srv://admin:admin@cluster0.a0sc2ac.mongodb.net/MentalHealth?retryWrites=true&w=majority");


app.post('/register' , async (req , res) =>{
  const {username ,email , password} = req.body;
  try{
    const userDoc = await User.create({
      username ,email, 
      password: bcrypt.hashSync(password , salt),
    });
      res.json(userDoc);
  }catch(err){
    console.log(err);
   res.status(400).json(err);
  }
});

app.post('/login', async (req,res) => {
  const {email , password} = req.body;
  const userDoc = await User.findOne({email});
  
  let passOk= false;
  if(userDoc !== null && userDoc.password !== null)
  passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({email, id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token' ,token).json('ok');
    });
  } else {
    res.status(404).json('wrong credentials');
  }
});

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  if (!token) {
    // Handle case where token is not provided
    return res.status(401).json({ error: 'JWT token is missing' });
  }
  jwt.verify(token, secret, {}, (err,info) => {
    if (err){
      // Handle token verification errors
      console.error(err);
      return res.status(401).json({ error: 'Invalid token' });
    }
    res.json(info);
  });
});

app.post('/logout' , (req, res) =>{
  res.cookie('token' , '').json('ok');
})

app.post('/post' ,upload.single('file'), async(req , res) =>{
  if (req.file && req.file.originalname ) {
  const {originalname , path} = req.file;
  const parts = originalname.split('.');
  const ext = parts[parts.length-1];
  const newPath = path + '.' + ext;
  fs.renameSync(path, newPath);
  // res.json({files: req.files});
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if(err) 
    throw err;
    const {title,content} = req.body;
    const postDoc = await Post.create({
      title,
      content,
      cover:newPath,
      author:info.id,
    });
    res.json(postDoc);
  });
}
else{
  res.status(404).json('wrong credentials');
}
})

app.put('/post',upload.single('file'), async (req,res) => {
  let newPath = null;
  if (req.file) {
    const {originalname,path} = req.file;
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    newPath = path+'.'+ext;
    fs.renameSync(path, newPath);
  }

  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {title,content ,id} = req.body;
    const postDoc = await Post.findById(id);
    const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json('you are not the author');
    }
    const post = await Post.findById(id);
if (post) {
  // Update the document
  post.title = title;
  post.content = content;
  post.cover = newPath ? newPath : post.cover;
  await post.save();
  res.json(post);
} else {
  res.status(404).json('Post not found');
}

  });

});


app.get('/post', async (req,res) => {
  res.json(
    await Post.find()
      .populate('author', ['username'])
      .sort({createdAt: -1})
      .limit(20)
  );
});

app.get('/post/:id' , async(req , res) =>{
  const {id} = req.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  res.json(postDoc);
})

app.listen(4000);

