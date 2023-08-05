const { handleGetUserById, handleGetAllUsers } = require("../controller/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = require("express").Router();


// Routes
router.get("/:id", authMiddleware, handleGetUserById)

// GET ALL Users
router.get("/", authMiddleware, handleGetAllUsers)


module.exports = router