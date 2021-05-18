
const authController = require("../controllers/authController")


module.exports = function (router){

  router.get("/api/cookie", authController.getCookie)
  router.post("/api/cookie",  authController.setCookie)


  router.post("/api/auth/admin-login", authController.adminLogin)
  
  router.post("/api/auth/current-admin", authController.getCurrentAdmin)
  
  router.post("/api/auth/is-admin", authController.checkIsAdmin)
  
// ******* get Files details **************
  router.post("/api/files", authController.getFiles)
  router.post("/api/upload/photo", authController.uploadPhoto)

}





