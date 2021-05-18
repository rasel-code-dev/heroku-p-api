const mongoose = require("mongoose")

 const ProjectSchema = new mongoose.Schema({
    images: [],
    title: { type: String, unique: true, required: true},
    description: String,
    link: String,
    source_code: String
})

mongoose.model("Project", ProjectSchema)
