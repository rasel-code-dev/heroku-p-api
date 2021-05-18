
const ownRoutes = require("./ownRoutes")
// const authRoute = require("./authRoute")
// const imageRoute = require("./imageRoute")
// const projectRoute = require("./projectRoute")
// const postRoute = require("./postRoute")
// const testimonialRoute = require("./testimonialRoute")


module.exports = function (router){
  ownRoutes(router)
  // imageRoute(router)
  // projectRoute(router)
  // authRoute(router)
  // postRoute(router)
  // testimonialRoute(router)
}







