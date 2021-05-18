const mongoose = require("mongoose")
const fs = require("fs");
const slugify = require("slugify");
const { errorResponse, successResponse } = require("../response/response")
const Post = mongoose.model("Post")

exports.getPosts = (req, res)=>{
  Post.find({}).then(doc=>{
    res.status(200).json({posts: doc})
  })
}

exports.addMarkDownPost = (req, res)=>{
  const { title, markdown_string, description } = req.body
    fs.writeFile(`md/${title}.md`, markdown_string, "utf-8", (err => {
      if(!err){
        Post.findOne({title: title}, (err, doc)=>{
          if(err) return errorResponse(res, "", "post deleted fail cause database")
          if(doc) return errorResponse(res, "409", "post already exist in database")
          
          Post.create({title, description, path: `md/${title}.md`}).then(doc=>{
            res.status(200).json({post: doc})
          })
          
        })
      }
    }))
}

exports.addPost = (req, res)=>{
  Post.create({...req.body}).then(doc=>{
    res.status(200).json({post: doc})
  }).catch(err=>{
    res.send("err")
  })
}
exports.updatePost = (req, res)=>{
  const { markdown_string, ...otherPostStuff } = req.body
    const post  = otherPostStuff.post
    fs.writeFile(otherPostStuff.post.path, markdown_string, "utf-8", (err => {
      if(!err) {
        let slug = slugify(post.title, { lower: true, strict: true})
        Post.findByIdAndUpdate(req.params.postId, {
          $set: {
            ...post,
            slug: slug
          }
        }, {new: true})
        .then(doc=>{
          res.status(200).json({post: doc})
        })
      }
    }))
}
exports.deletePost = (req, res)=>{
  Post.findByIdAndDelete(req.params.postId, (err, doc)=>{
    if(!err){
      if(doc && doc.path) {
        fs.stat(doc.path, (err, stat) => {
          if (!err) {
            fs.unlink(doc.path, err => {
              if (!err) {
                successResponse(res, "",{message: "post deleted", post_id: req.params.postId})
              } else {
                successResponse(res, "", {
                  message: "post deleted from db but not md file your server",
                  post_id: req.params.postId
                })
              }
            })
          }
        })
      } else{
        errorResponse(res, 404, "post not found in database")
      }
    } else{
      errorResponse(res, "", "post deleted fail cause database")
    }
  })
}



exports.getPost = (req, res)=>{
  Post.findById(req.params.postId).then(doc=>{
    res.json({post: doc});
  })
}

exports.filterPost = (req, res)=>{
  Post.aggregate([
    { $match: {
        $or: req.body.tags.length > 0 ? [{ tags: { $in: req.body.tags  } }] : [{}]
    } }
  ]).exec((err, doc)=>{
    successResponse(res, 200, { posts: doc })
  })
}
exports.getMarkdownFile = (req, res)=>{
  Post.findById(req.params.postId).then(doc=>{
    if(doc){
      let stream = fs.createReadStream(doc.path)
      stream.on("open", (data)=>{
        res.writeHead(200, { 'Content-Type': "text/markdown; charset=UTF-8" });
        stream.pipe(res);
      })

      stream.on('error', function(err) {
        res.end(err);
      });
    }
  
  }).catch(ex=>{
    errorResponse(res, "", "Something were wrong")
  })
}

exports.addComment = async (req, res)=>{
  let post = await Post.findById(req.params.postId)
    let pComent = req.body.parentCommentId
    const { username, description, avatar } = req.body
    let newCommnet = {username, description, createdAt: new Date(), avatar: avatar }
    if(pComent){
      let getParentCommIndex = post.comments.findIndex(c=>c._id == pComent )
      if(getParentCommIndex !== -1) {
        post.comments[getParentCommIndex].reply.push(newCommnet)
      }
    } else{
      post.comments.push(newCommnet)
    }

    post = await post.save()
    res.send(post)
}


exports.deleteComment =  (req, res)=>{
  const { comment_id, parent_comment_id } = req.body
    
  Post.findById(req.params.postId).then(post=>{
    if(parent_comment_id){
      let g = post.comments.find(c=>c._id == parent_comment_id )
      let nn  = g.reply.filter(n=>n._id != comment_id)
      g.reply = nn
      post.save().then(p=>{
        successResponse(res, '', { post: p })
      })
      
    } else{
      let comm = post.comments.filter(p=>p._id != comment_id )
      post.comments = comm
      post.save().then(p=>{
        successResponse(res, '', { post: p })
      })
    }
  })
}


exports.toggleLikePost =  (req, res)=>{
  let action; 
    Post.findById(req.params.postId).then(doc=>{
      let isLikesExit = doc.likes && doc.likes.findIndex(l=>l == req.body.browser_id ) 
      if(isLikesExit === -1){ 
        action = "added"
        doc.likes.push(req.body.browser_id )
      } else{
        action = "removed"
        doc.likes.splice(isLikesExit, 1)
      }
      return doc.save()
    }).then(f=>{
      successResponse(res, "", { id: req.body.browser_id, action: action  })
    }).catch(err=>{
      errorResponse(res, "", err.message)
    })
}