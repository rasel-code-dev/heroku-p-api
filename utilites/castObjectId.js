const mongoose = require("mongoose")

function cast(id){
  if (id.length < 24) {
    return false
  } else{
    return mongoose.Types.ObjectId(id)
  }
}

module.exports = cast