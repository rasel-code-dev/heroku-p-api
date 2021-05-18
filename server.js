'use strict';
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require("morgan")
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');
const  keys = require("./keys/index");

// initial dotenv configuration
require('dotenv').config()

require("./models/Own")
require("./models/Image")
require("./models/Project")
require("./models/Post")
require("./models/Testimonial")



const routes  = require("./routes/index")

function handleStaticFileServer(req, res){
  const mimeType = {
  '.js': 'application/javascript',
  '.jpg': 'image/jpg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
}
  const fileUrl = req.url
  const filePath = path.resolve("./" + fileUrl)

  let fileExt = path.extname(filePath)
  let fileMimeType = mimeType[fileExt]
  if(!fileMimeType){
    res.setHeader("Content-Type", "application/json")
    res.write(JSON.stringify( { message: "file not handle" } ))
    res.end()
    return
  }

  // res.setHeader("Content-Type", "application/json")
  // res.write(JSON.stringify( { message: filePath } ))
  // res.end()
  
  fs.stat(filePath, ((err, stat) => {
    if(err){
      res.setHeader("Content-Type", "application/json")
      res.write(JSON.stringify( { message: "file not found", filePath: filePath } ))
      res.end()
      return
    }
    
    res.writeHead(200, {"Content-Type": fileMimeType})
    // res.setHeader("Content-Type", "image/png")
    fs.createReadStream(filePath).pipe(res)
    
  }))

}


// router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
// router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({
  origin: keys.FRONTEND,
  credentials: true
}))

app.use(cookieParser())
// set cookie
app.use(cookieSession({ 
  name: 'session',
  keys: [keys.JWT_SECRET],
  // secret: "FDSFSDF",
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


if(process.env.NODE_ENV === "development"){
  app.use(morgan("tiny"))
}
// **** use custom logger middleware
// app.use((req, res, next)=>{
//   console.log(req.url, req.method);
//   next()
// })


const corsOptions = {
  origin: function (origin, callback) {
    if(["http://localhost:3000"].indexOf(origin) !== -1){
      callback()
    }
  }
}


// cors..............
// const allAllowedOrigin = [...config.ORIGINS]
// app.use(cors({
//   credentials: true,
//   origin: (origin, callback)=>{
//     if(allAllowedOrigin.includes(origin)){
//       callback(null, true)
//     } else{
//       callback(new Error(`Origin: ${origin} is not allowed`))
//     }
//   }
// }))


// app.use((req, res, next)=>{
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
//   next()
// })

 
routes(app)  

app.get("/static/**", (req, res)=>{
  handleStaticFileServer(req, res)
})


app.use("/static", express.static("static"))

const connectDb = require("./database/db")
connectDb(err=>{
  if(err){
    console.log("mongodb connection fail");
    // process.exit(1)
  } else{
    console.log("mongodb connected...");
  }
})
let PORT = process.env.PORT || 4000

app.listen(PORT, ()=>console.log(`server is listening on port ${PORT}`))
