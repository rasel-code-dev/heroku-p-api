

const mongoose = require("mongoose")


const TestimonialSchema = new mongoose.Schema({
  name: String,
  quote: String,
  avatar: String,
  position: String
})

mongoose.model("Testimonial", TestimonialSchema)
