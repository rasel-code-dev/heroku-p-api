function errorHandler(msg, status, next){
  let error = new Error()
  error.message = msg
  error.statusCode = status ? status : 500
  return next(error)
}


module.exports =  errorHandler