

const testimonialsController = require("../controllers/testimonialController")

module.exports =  (app)=>{
  
  app.get("/api/testimonials", testimonialsController.getTestimonials)
  
  
  app.post("/api/add-testimonial", testimonialsController.addTestimonial)
  
  app.delete("/api/testimonials/:id", testimonialsController.deleteTestimonials)
  
  app.post("/api/update-testimonial/:id", testimonialsController.updateTestimonials)
  
  
}
