const mongoose = require("mongoose")

const ImgSchema = new mongoose.Schema({
  path: { type: String, unique: true, required: true},
  name: { type: String, unique: true, required: true},
  size: Number
})

mongoose.model("Image", ImgSchema)
