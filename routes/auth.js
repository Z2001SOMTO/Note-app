const router = require("express").Router()
const { handleSignup, handleLogin } = require("../controller/auth.controller")

// REGISTER ROUTE
router.post("/signup", handleSignup)

// LOGIN ROUTE
router.post("/login", handleLogin)
router.post("/signin", handleLogin)


module.exports = router