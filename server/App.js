const express=require('express')
const app=express()
// const request = require('request');

const env= require('dotenv')
env.config()
const bodyParser= require ('body-parser')
app.use(bodyParser.json())
const cors= require('cors')
app.use(cors())

const path = require('path');
const userRouter = require ('./Routers/userRouter')
app.use('/user',userRouter)
const exerciseUserRouter = require ('./Routers/exerciseUserRouter')
app.use('/exerciseUser',exerciseUserRouter)
const letterRouter = require ('./Routers/letterRouter')
app.use('/letter',letterRouter)
const wordRouter = require ('./Routers/wordRouter')
app.use('/word',wordRouter)

// app.use('/image', express.static(path.join(__dirname, 'images',"unnamed.jpg")))

app.use(express.static('public')); 

// app.use('/images', express.static('images'));

app.use('/images', express.static(__dirname + '/images'));
app.use('/audio', express.static(__dirname + '/audio'));

// app.use('/uppercase', express.static('/uppercase'));
// app.get('/image',async (req,res)=>{
//     const url = `http://localhost:3030/images/rr.jpg`
//    console.log("kkkkkkkkkkkkkk");
//    console.log(url);
//     res.send(`<img src="images/rr.jpg">`)
// })

// app.get('/image', async (req, res) => {
//     const url = 'http://localhost:3030/images/rr.jpg';
  
//     request({
//       url: url,
//       encoding: null
//     }, 
//     (err, resp, buffer) => {
//       if (!err && resp.statusCode === 200){
//         // res.set("Content-Type", "image/jpeg");
//         res.send(resp.body);
//       }
//     });
//   });

console.log(__dirname,"=============",path.join(__dirname, 'images',"unnamed.jpg"));
// const imageRouter = require ('./Routers/userRouter')
// app.use('image')
const mongoose= require('mongoose')
mongoose.connect(process.env.MONGO_CONNECTION,{

}).then(()=>{
    console.log("connect to mongo!!");
})



const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../../images/users')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage: storage })



app.post('/bulk', upload.single('file') , (req, res) =>{
    try {
        res.send(req.file);
    } catch(error) {
          console.log(error);
           res.send(400);
    }
});
// app.use(express.static('images')); 
// const path=require('path')
// const dirPath=path.join(__dirname, 'images')





app.listen(3030, ()=>{
    console.log("listening on port 3030");
})