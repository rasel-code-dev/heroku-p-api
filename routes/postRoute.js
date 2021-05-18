
const postController = require("../controllers/postController")

module.exports = function (app) {
  
  // save markdown post
  app.post("/api/add-markdown-post", postController.addMarkDownPost)
  
  // update post
  app.post("/api/update-post/:postId", postController.updatePost)
  
  // fetch all post......
  app.get("/api/posts", postController.getPosts)
  
  // create post
  app.post("/api/posts", postController.addPost)
  
  // filter post........
  app.post("/api/filter-posts", postController.filterPost)
  
  // get post by id
  app.get("/api/post/:postId", postController.getPost)
  
  // get only markdown text by id
  app.get("/api/post-md/:postId", postController.getMarkdownFile)
  
  app.delete("/api/post/:postId", postController.deletePost)
  
  // add comment
  app.post("/api/comment/:postId", postController.addComment)
  
  app.post("/api/delete-comment/:postId", postController.deleteComment)

  app.post("/api/like/:postId", postController.toggleLikePost)
}

