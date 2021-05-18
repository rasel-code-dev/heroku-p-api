

const projectController = require("../controllers/projectController")

module.exports =  (app)=>{
  app.get("/api/projects", projectController.getProjects)
  app.delete("/api/projects/:id", projectController.deleteProject)
  app.post("/api/new-project", projectController.addNewProject)
  app.post("/api/update-project/:id", projectController.updateProject)  
}
