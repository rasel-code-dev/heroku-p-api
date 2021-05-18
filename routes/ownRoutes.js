
const ownController = require("../controllers/ownController")

module.exports =  (app)=>{
  app.get("/api/data", ownController.getData)

  // app.post("/api/data/:id", ownController.postData)


  // app.get("/api/static-files", ownController.getStaticFile)
  
  // // // upload multiple images file
  // app.post("/api/upload-file", ownController.uploadMultipleImage)

  // // // send me email 
  // app.post("/api/mail", ownController.sendMailController)

}

