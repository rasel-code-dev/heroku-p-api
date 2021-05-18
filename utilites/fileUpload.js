const multer = require('multer')

function fileUpload(dest, fileType, fieldName, isMultiple) {
  const fileStorage = multer.diskStorage({
    destination: (req, file, done)=>{
      done(null, dest)
    },
    filename: (req, file, done)=>{
      // const FileTool = require('../utilites/fileTools')
      // let tool = new FileTool(null, file.originalname)
      // done(null, tool.fileName)
      done(null, file.originalname)
    }
  })
  
  const fileFilter = (req, file, cb) => {
    let type = file.mimetype.replace("image/", "")
    if(fileType.indexOf(type) !== -1) {
      cb(null, true);
    } else{
      cb(null, false);
    }
  };
  
  if(isMultiple){
    return multer({
      storage: fileStorage,
      fileFilter: fileFilter
    }).fields(fieldName )
  } else {
    return multer({
      storage: fileStorage,
      fileFilter: fileFilter
    }).single(fieldName)
  }
  
}

module.exports = fileUpload

/**
 ************ use like this *************
 
 fileUpload("images/", ["png"], "images", true)(req, res, (err)=>{
    console.log(err)
    console.log(req)
 })
 
 
 ******* if use multiple **********
 fileUpload("static/projects", ["jpg", "png", "jpeg"], [{name:"images", maxCount: 5}], true)(req, res, (err)=>{
      console.log(req.files)
  })
 * */


// const makeDir = require('./makeDir')
//
// function fileUpload(dest, fileType, fieldName, isMultiple=false){
//   const fileStorage = multer.diskStorage({
//     destination: (req, file, done)=>{
//       makeDir(dest, ()=> done(null, dest) )
//     },
//     filename: (req, file, done)=>{
//       const FileTool = require('./fileTools')
//       let tool = new FileTool(null, file.originalname)
//       done(null, tool.fileName)
//     }
//   })
//
//   const fileFilter = (req, file, cb) => {
//     for(let i=0; i < fileType.length; i++){
//       if(file.mimetype === `image/${fileType[i]}`){
//         cb(null, true);
//       } else{
//         cb(null, false);
//       }
//     }
//   };
//
//   // if(isMultiple){
//   //   // return callback funtion with paramater (... (err)={} )
//   //   m = multer({storage: fileStorage, fileFilter: fileFilter}).array(fieldName, 10)
//   // } else{
//   //   m = multer({storage: fileStorage, fileFilter: fileFilter}).single(fieldName)
//   // }
//   //
//   // return m
//   return multer({
//     storage: fileStorage,
//     fileFilter: fileFilter
//   }).array("images", 10)
//
// }
//
// module.exports = fileUpload


// const fileStorage = multer.diskStorage({
//   destination: (req, file, done)=>{
//     // makeDir("/images/upload", ()=> done(null, "/images/upload") )
//     done(null, path.join(__dirname, "..", "/images"))
//   },
//   filename: (req, file, done)=>{
//     const FileTool = require('../utilites/fileTools')
//     let tool = new FileTool(null, file.originalname)
//     done(null, tool.fileName)
//   }
// })
//
//
//
// let upload = multer({storage: fileStorage}).array("images", 10)
