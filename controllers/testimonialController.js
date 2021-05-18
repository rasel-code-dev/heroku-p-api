
const mongoose = require("mongoose");

const Testimonial = mongoose.model("Testimonial")

const { successResponse, errorResponse } = require("../response/response")

const fileUpload = require("../utilites/fileUpload")
const slugify = require("slugify");

exports.getTestimonials = (req, res)=>{
  Testimonial.find({}).then(testimonials=>{
    successResponse(res, "", { testimonials: testimonials})
})
}

exports.addTestimonial = (req, res)=>{
  fileUpload("static/avatar/", ["jpg", "png", "jpeg"], "avatar", false)(req, res, (err)=>{
    if(!err){
 
      let newTestimonial = {
        avatar: req.file.path,
        name: req.body.name,
        quote: req.body.quote,
        position: req.body.position
      }
      Testimonial.create(newTestimonial).then(newTest=>{
        successResponse(res, "",{ testimonial: newTest })
      })
    } else{
      errorResponse(err, "", err.message)
    }
  })
}

exports.deleteTestimonials = (req, res)=>{
  Testimonial.findByIdAndDelete(req.params.id).then(testimonial=> {
    successResponse(res, "", testimonial)
  })
}

exports.updateTestimonials = (req, res)=>{
  Testimonial.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true}).then(testimonial=> {
    successResponse(res, "", testimonial)
  })
}
