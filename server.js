require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const User = require("./models/user")
const productRoutes = require("./routes/product")
const categoryRoutes = require("./routes/category")
const ownerRoutes = require("./routes/owner")

const app = express()

// Middlewares
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes
app.use("/api", productRoutes)
app.use("/api", categoryRoutes)
app.use("/api", ownerRoutes)

// Connect to database
mongoose.connect(
	process.env.DATABASE,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	err => {
		if (err) {
			console.log(err)
		} else {
			console.log("Database connected ...")
		}
	}
)

const PORT = process.env.PORT || 3000

app.listen(3000, () => {
	console.log(`Server running on port ${PORT} ...`)
})
