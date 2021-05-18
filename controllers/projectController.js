const mongoose = require("mongoose");

const Project = mongoose.model("Project")

const fileUpload = require("../utilites/fileUpload")
const {errorResponse} = require("../response/response");
const {successResponse} = require("../response/response");
const deleteFile = require("../utilites/deleteFile")
const fs = require("fs");
const renameFile = require("../utilites/rename");


exports.getProjects = (req, res)=>{
  Project.find().then(projects=>{
    res.status(200).send(projects)
  })
}
exports.deleteProject = (req, res)=>{
  Project.findByIdAndDelete(req.params.id, (err, doc)=>{
    if(!err){
      if(doc.images && doc.images.length > 0) {
        for (const img of doc.images) {
          deleteFile(img)
        }
      }
      successResponse(res, "", { message: "Project Deleted", _id: doc._id })
    }
  })
}

exports.addNewProject = (req, res)=>{
  fileUpload("static/projects", ["jpg", "png", "jpeg"], [{name:"blob_images", maxCount: 5}], true)(req, res, (err)=>{
    let images = []
    if(req.files.blob_images && req.files.blob_images.length > 0) {
      for (let file of req.files.blob_images) {
        images.push(file.path)
      }
    }
   

    
    Project.create({...req.body, images: images}).then(r => {
      successResponse(res, "", r)
    })
    
    .catch(err=>{
      errorResponse(res, 422, { message: err.message})
    })
    
  })
}

exports.updateProject = (req, res)=>{
  fileUpload("static/projects", ["jpg", "png", "jpeg"], [{name:"blob_images", max: 5}], true)(req, res, (err)=>{
    if(!err){
      let images = []
      
      if(req.files.blob_images && req.files.blob_images.length > 0) {
        for (let file of req.files.blob_images) {
          let newName = renameFile(file.path, ()=>{})
          images.push(newName)
        }
      }

      if(req.body.deleted_images){
        let deleted_images = JSON.parse(req.body.deleted_images)
        if(deleted_images && deleted_images.length > 0) {
          for (const img of deleted_images) {
            deleteFile(img, err=>{
              console.log(err)
            })
          }
        }
      }

      console.log(req.body.images)
      
      let newImages = []
      if(req.body.images && req.body.images !== "undefined"){
        newImages = [...newImages, ...JSON.parse(req.body.images)]
      }
      if(images && images.length > 0){
        newImages = [...newImages, ...images]
      }


      Project.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          images: newImages,
          deleted_images: ""
        },
        { new : true }
      )
        .then(r => {
          successResponse(res, "", r)
        })
        .catch(err=>{
          errorResponse(res, 422, { message: err.message})
        })
    }
  })
}