const { response } = require("../utils/helper")
const { CustomError } = require("../utils/error")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")
const Auth = require("../models/auth.model")
require("dotenv").config()

// const DB = []
const handleSignup = async (req, res) => {
  try {
    // Get the body: {email, password, username}
    if(!req.body.email) throw new CustomError("Email is required!", 400)
    if(!req.body.password) throw new CustomError("Password is required!", 400)
    if(!req.body.username) throw new CustomError("Username is required!", 400)

    // Check if email exists
    
  const check = await Auth.findOne({ emai: req.body.email })
    if(check) throw new CustomError("Email already exist", 400)

    // Hash the password
    const hash = await bcrypt.hash(req.body.password, 10)

    // Store the person's creds in DB
   const user = Auth.create({
    username: req.body.email,
    password: hash,
    email: req.body.email
   })

    const data = {
      id: user._id,
      email: user.email,
      username: user.username,
    }

    // Send back response
    res.status(201).send(response("Registration successful!", data))
  }
  catch (e) {
    res.status(e.code || 500).send(response(e.message, null, false))
  }
}


const handleLogin = async (req, res) => {
  try {
    if(!req.body.email) throw new CustomError("Email is required", 400)
    if(!req.body.password) throw new CustomError("Password is required", 400)

    // Check if the user exist
    const user = await Auth.findOne({ email: req.body.email})
    if(!user) throw new CustomError("User is not found", 404)
    // Compare the passwords
    if (!await bcrypt.compare(req.body.password, user.password)) throw new CustomError("Incorrect Credentials", 400)
    // Create an access token with the user's id
    const token = jsonwebtoken.sign({ id: user.id }, process.env.APP_SECRET, { expiresIn: "7d" })

    const data = {
      token,
      user: {
        username: user.username,
        email: user.email,
        id: user.id,
      }
    }

    res.status(200).send(response("Login success!", data))
  }
  catch(e) {
    res.status(e.code || 500).send(response(e.message, null, false))
  }
}

const handleGetUserById = async (req, res) => {
  try {
    // Check if id param is set
    const {id} = req.params
    if(!id) throw new CustomError("Id is required", 400)

    // Find the user based on the id param
   const user = await Auth.findById(id)
   if(! user) throw new CustomError("User is not found", 404)

   res.status(200).send(response("User found!", user))
  }
  catch(e) {
    res.status(e.code || 500).send(response(e.message, null, false))
  }
}
const handleGetAllUsers = async (req, res) => {
  try {
    const user = await Auth.find()
    res.status(200).send(response("All User", user))
  }
  catch(e) {
    res.status(e.code || 500).send(response(e.message, null, false))
  }
}

module.exports = {
  handleSignup,
  handleLogin,
  handleGetUserById,
  handleGetAllUsers
}