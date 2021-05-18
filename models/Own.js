
const mongoose = require("mongoose")

const OwnSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  profile_photo: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true },
  skills: [{name: String, value: Number, color: String }],
  hero_avatar: String,
  hero_bigtitle: String,
  hero_description: String,
  skills_description: String,
  about_description: String,
  about_subtitle: String,
  about_title: String,
  services: [{}],
  services_subtitle: String,
  testimonial_subtitle: String,
  contact_phone: String,
  contact_email: String,
  contact_address:String
})

mongoose.model("Own", OwnSchema)
