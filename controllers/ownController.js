
const mongoose = require("mongoose")
// const {errorResponse} = require("../response/response");
// const {successResponse} = require("../response/response");

const Own = mongoose.model("Own")

// const fs = require("fs");
// const fileUplaod = require("../utilites/fileUpload")
// const renameFile = require("../utilites/rename");
// const sendMail = require("../mail")


// function checkIsDir(rootDir, res){
//   fs.readdir(rootDir, async (err, doc)=>{
//     let staticDir = []
    
//     for (const d of doc) {
//       const index = doc.indexOf(d);
      
//       let eachDir = rootDir + "/" + d
//       let files = await fs.statSync(eachDir)
//       if (files.isFile()) {
//         staticDir.push({name: d, isDir: false, path: eachDir})
//       } else {
//         staticDir.push({name: d, isDir: true, path: eachDir})
//       }
      
//       if(index + 1 === doc.length) {
//         successResponse(res, "", staticDir)
//       }
//     }
//   })
// }


exports.getData = (req, res)=>{
  Own.find({}).select("-password").then(doc=>{
    res.send(doc[0])
  })
}



// exports.postData = (req, res)=>{
//   Own.findOneAndUpdate(
//     {_id: req.params.id},
//     { $set: { ...req.body }  },
//     { new: true }
//   )
//     .select("-password")
//     .then(doc=>{
//     successResponse(res, "", doc)
//   })
//     .catch(ex=>{
//       errorResponse(res, 500, { message: ex })
//     })
// }



// exports.getStaticFile = (req, res)=>{
//   if(req.query.browser) {
//     let p = req.query.browser
//     fs.readdir(p, async (err, fileList)=>{
//       let staticDir = []
//       for (const d of fileList) {
//         const index = fileList.indexOf(d);
  
//         let eachDir = p + "/" + d
//         let files = await fs.statSync(eachDir)
//         if (files.isFile()) {
//           staticDir.push({name: d, isDir: false, path: eachDir, size: files.size})
//         } else {
//           staticDir.push({name: d, isDir: true, path: eachDir})
//         }
  
//         if(index + 1 === fileList.length) {
//           successResponse(res, "", staticDir)
//         }
//       }
//     })
//   } else{
//     let rootDir =  "static"
//     checkIsDir(rootDir, res)
//   }
// }



// exports.uploadMultipleImage = (req, res)=>{
//   fileUplaod("static/upload/", ["jpg", "png", "jpeg", "svg+xml", "gif"], [{ name: "upload", maxSize: 2000}], true)(req, res, (err)=>{
//     if(!err){
//       if(req.files && req.files.upload && req.files.upload.length > 0) {
//         let newUploadedFile = []
        
//         for (let i = 0; i < req.files.upload.length; i++) {
//           let newName = renameFile(req.files.upload[i].path, () => {})
//           newUploadedFile.push(newName)
//         }
//         successResponse(res, "",  newUploadedFile)
//       }
//     } else {
//       errorResponse(res, "", err)
//     }
//   })
// }


// exports.sendMailController = (req, res)=>{
//   if(!req.body.from || !req.body.subject || !req.body.text){
//     errorResponse(res, 422,  "please send valid creadiential")
// } else{ 
//   sendMail(
//     req.body.from, 
//     req.body.subject, 
//     `${req.body.name} say: ` + req.body.text, 
//     (err, info)=>{
//       if(err){
//         errorResponse(res, 401,  "message not send please try again." )
//       } else{
//         successResponse(res, 200,  { message:"message has been send"} )
//       }
//     }
//   )
// }
// }

