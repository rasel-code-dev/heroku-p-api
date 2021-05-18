const fs = require("fs")


function deleteFile(filePath){
  fs.unlink(filePath, err => {
    return err
  })
}

module.exports = deleteFile
