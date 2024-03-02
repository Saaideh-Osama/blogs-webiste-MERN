const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require('bcryptjs');
const mongoose  = require('mongoose')
const User = require('./models/User')
const salt = bcrypt.genSaltSync(10);
const multer = require('multer');
const forms = multer();

const jwt = require('jsonwebtoken');

const Post =require('./models/Post')
const uploadMiddleware = multer({dest:''})
const secret ='asfniqsfnqisnfaksfnaposg653a4sf6a6s'
const cookieParser = require('cookie-parser')
app.use(cors({credentials:true,origin:'http://localhost:3000'}));

app.use(forms.array()); 

app.use(express.json())
mongoose.connect('mongodb+srv://saaidehosama:4Q2xLrAABrsgsGUM@cluster0.hohpxap.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
app.use(cookieParser())
app.use(bodyParser.json());
app.get('/',(req,res)=>{
res.json("test ok ")
})
app.post('/register',async(req,res)=>{
const {username,password} = req.body;
try{
    const UserDoc = await User.create({username,password:bcrypt.hashSync(password,salt)})
    res.json(UserDoc)
}
catch(e){
res.status(400).json(e);
}

})
app.get('/profile',(req,res)=>{
const {token}=req.cookies
jwt.verify(token,secret,(err,info)=>{
  if(err) throw err ;
  res.json(info) })
  res.json(req.cookies)}
)
app.post('/login', async (req,res) => {
    const {username,password} = req.body;
    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      // logged in
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
        if (err) throw err;
        res.cookie('token', token).json({
          id:userDoc._id,
          username,
        });
      });
    } else {
      res.status(400).json('wrong credentials');
    }
  });
  app.post('/logout',(req,res)=>{
    res.cookie('token','').json('logged out')})

    app.get('/post',async(req,res)=>{
      
res.json(await Post.find().populate('author',['username']))});


app.post('/post',async(req,res)=>{

const {token}=req.cookies
  jwt.verify(token,secret,async(err,info)=>{
    if(err) throw err ;
    const {title,summary,content} = req.body;
    res.json({title,summary,content})
    const PostDoc = await Post.create({title,summary,content,author:info.id})
    res.json(PostDoc)
   });
    res.json(req.cookies)

})

app.listen(9000)