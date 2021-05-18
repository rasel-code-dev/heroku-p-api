
const mongoose = require("mongoose")
const slugify = require("slugify")

const Comment = {
  username: String,
  description: String,
  createdAt: String,
  avatar: String,
  reply: [
    { username: String,
      description: String,
      createdAt: String,
      avatar: String,
    }
  ]
}

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  path: String,
  postThumbnail: String,
  description: String,
  slug: {
    type: String,
    required: true,
    unique: true
  },
  comments: [ Comment ],
  tags: [],
  likes: [],
}, { timestamps: true} )



PostSchema.pre("validate", function (){
  if(this.title){
    this.slug = slugify(this.title, { lower: true, strict: true})
  }
})




mongoose.model("Post", PostSchema)
