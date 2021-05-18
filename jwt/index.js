const jwt = require("jsonwebtoken")
const keys = require("../keys")

async function jwtValidate(token){
  try {
    let data = await jwt.verify(token, keys.JWT_SECRET)
    if ((data.exp * 1000) > Date.now()) {
      return data.email
    } else {
      return false
    }
  }
  catch (ex){
    return false
  }
}

function createToken(payload){
  return jwt.sign(payload, keys.JWT_SECRET, { expiresIn: '1h' })
}



module.exports =  { jwtValidate, createToken }
