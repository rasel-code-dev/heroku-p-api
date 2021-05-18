const nodemailer = require("nodemailer")
const mg = require('nodemailer-mailgun-transport');
const keys = require("../keys")

function sendMail(from, subject, text, cb){
  const auth = {
    auth: {
      api_key: keys.MAILGUN_API_KEY,
      domain: keys.MAILGUN_DOMAIN
    }
  }

  const nodemailerMailgun = nodemailer.createTransport(mg(auth));

  const mail = {
    from, // sender address
    to: "raselmr005@gmail.com", // list of receivers
    subject,
    text
  }

  nodemailerMailgun.sendMail(mail, (err, info)=>{
     if(err){
       cb(err, null)
     } else{
       cb(null, info)
      }
  })
}

module.exports = sendMail