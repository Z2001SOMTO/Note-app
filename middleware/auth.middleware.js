const { CustomError } = require("../utils/error")
const jwt = require("jsonwebtoken")
const { response } = require("../utils/helper")
require("dotenv").config()

const authMiddleware = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization
    if(!authorization) throw new CustomError("No authorization header found", 401) // Unauthorized

    const token = authorization.split(" ")[1]
    const data = jwt.verify(token, process.env.APP_SECRET)

    console.log("PAYLOAD:", data)

    if(!data) throw new CustomError("Invalid Token", 401)

    // Run code to get user's info
    req.userId = data.id
    next()
  }
  catch(e) {
    res.status(e.code || 500).send(response(e.message, null, false))
  }
}


module.exports = authMiddleware