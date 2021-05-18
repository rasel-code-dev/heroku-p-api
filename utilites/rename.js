const fs =  require("fs")

function renameFile(filePath, callback){
  let newPath = filePath.replaceAll(" ", "-")
  fs.rename(filePath, newPath, (err => {
    callback(err)
  }))
  return newPath
}


module.exports = renameFile
