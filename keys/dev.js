
module.exports = {
  DB_HOST: "mongodb://localhost:27017/admin",
  JWT_SECRET: process.env.JWT_SECRET, // avoid production secret
  ORIGINS: "http://localhost:3000",
  FRONTEND: "http://localhost:3000",
  MAILGUN_API_KEY: process.env.MAILGUN_API_KEY,
  MAILGUN_DOMAIN: process.env.MAILGUN_DOMAIN
}
