const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000

// Express Middlewares
app.use(express.urlencoded({ extended: true }))

// Morgan Middlewares
app.use(morgan("dev"))

// Cors Middlewares
app.use(cors({origin: "*"}))

// JSON BODIES
app.use(express.json({ limit: "50mb" }))


// Making endpoints with Express
app.get("/", (req, res) => {
  res.send(`<h1>Welcome to ${process.env.APP_NAME}</h1>`)
})


// GET [/ping]
// -> { message: "Api Running", error: false }
app.get("/ping", (req, res) => {
  res.send({ 
    message: "Api Running", 
    error: false 
  })
})

const students = []

// SENDING DATA TO THE SERVER
app.post("/create", (req, res) => {
  if(!req.body.name) {
    res.status(400).send({ error: "Name is required", data: null })
  }
  const student = { 
    name: req.body.name, 
    id: students.length + 1 
  }

  students.push(student)
  res.status(201).send({ error: null, data: student, message: "Student Added" })
})

// GET [/students]
// -> students[]

app.get("/students", (req, res) => {
  res.status(200).json({ data: students, error: null })
})


// NOTES API
const noteRouter = require("./routes/notes")
app.use("/notes", noteRouter)

// AUTH ROUTES
const authRoutes = require("./routes/auth")
app.use("/auth", authRoutes)

// USER ROUTES
const userRoutes = require("./routes/user");
app.use("/user", userRoutes)


const connectToDB = require("./config/database")

connectToDB(() => {
 app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
 })
})