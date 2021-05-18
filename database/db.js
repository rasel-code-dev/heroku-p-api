const mongoose = require("mongoose")

const keys = require("../keys")


function connectDb(callback){ 
  mongoose.connect(keys.DB_HOST,  { useUnifiedTopology: true, useNewUrlParser: true } ).then(doc=>{
    callback(false)
  })
  .catch((err)=>{
    callback(err)
  })
}

module.exports = connectDb
