
const {jwtValidate} = require("../jwt/index")
const config  = require("../config")

export const isAuth = (req, res, next)=>{
  const token = req.headers.authtorization
  console.log(token)
  // jwtValidate(token).then(r => {
  //   if(r){
  //     res.status(200).json({admin: r})
  //   } else {
  //     res.status(403).json({message: "token expired"})
  //   }
  // })
}
