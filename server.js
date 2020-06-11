require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")

const app = express()

// Middlewares
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
