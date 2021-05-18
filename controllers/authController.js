const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const fs = require("fs");
const path = require("path");



const Own = mongoose.model("Own")

const { jwtValidate, createToken } = require("../jwt/index");
const { successResponse, errorResponse } = require("../response/response");


exports.getCookie = (req, res)=>{
  if(req.cookies && req.cookies.browser_id){
    successResponse(res, "", { id: req.cookies.browser_id })
  } else{   
    errorResponse(res, 404, "cookie not set")
  }
}

exports.setCookie = (req, res)=>{
  let browser_id = Math.round((Math.random() * Date.now()))
    res.cookie('browser_id', browser_id, { httpOnly: true })    
    successResponse(res, "", { id: browser_id })
}

exports.adminLogin = (req, res)=>{
  // please use password hash for more secure.............
  Own.findOne({email: req.body.email, password: req.body.password}).select("-password").then(doc=>{
    if(doc){
      let token = createToken({ email: req.body.email })
      if(token){
        res.status(200).json({ token: token, admin: doc})
      } else{
        return res.status(500).json({message: "Token creation fail "})
      }
    } else{
      return res.status(404).json({message: "You are not able to permit access as Admin"})
    }
  })
  .catch(err=>{
    console.log(err)
  })
}

exports.getCurrentAdmin = (req, res)=>{
  let token  = req.headers.authtorization

    if(token) {
      jwtValidate(token).then(r => {
        if (r) {
          Own.findOne({email: r}).populate("profile_photo").select("-password").then(doc=>{
            if(doc){
              res.status(200).json({admin: doc})
            }
          })
        } else {
          res.status(403).json({message: "please login first"})
        }
      })
    } else{
      res.status(401).json({message: "Admin Need To Login"})
    }
}

exports.checkIsAdmin = (req, res)=>{
  let token  = req.headers.authtorization
    if(token){
      jwtValidate(token).then(r => {
        if(r){
          res.status(200).json({admin: r})
        } else {
          res.status(403).json({message: "token expired"})
        }
      })
    } else{
      res.status(403).json({message: "please login first"})
    }
}



exports.uploadPhoto = (req, res)=>{
  const fileUpload = require("../utilites/fileUpload")
    fileUpload("static/avatar", ["png", "jpg"], "photo", false)(req, res, function (err){
      let file =  req.file
      if(file) {
        let newFile = {
          name: file.filename,
          path: file.path,
          size: file.size
        }
        
        Own.findOneAndUpdate(
          { email: "rasel@gmail.com" }, {
            $push: { images: newFile }
          }, { new: true })
          .exec((err, doc)=>{
            console.log(doc,err)
          })
        
        res.status(201).json({message: "File uplaoded", newFile: newFile})
      } else {
      
      }
    })
}

exports.getFiles = (req, res)=>{
  let token  = req.headers.authtorization
  if(token){
    jwtValidate(token).then(r => {
      if(r){
        const images = req.body.images
        let g = []
        
        let len = images.length
        images.forEach((img, i)=>{
          fs.stat(path.resolve("./"+ img), (err, stat)=>{
            if(!err){
              g.push({size: stat.size, url: img })
              
              if(len === i + 1){
                // end of loop. then send response..
                res.status(200).json({images: g })
              }
            }
          })
        })
        
      } else {
        res.status(403).json({message: "token expired"})
      }
    })
  } else{
    res.status(403).json({message: "please login first"})
  }
}