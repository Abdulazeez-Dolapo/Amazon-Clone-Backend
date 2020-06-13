const mongoose = require("mongoose")
const Schema = mongoose.Schema

const OwnerSchema = new Schema({
	name: String,
	about: String,
})

module.exports = mongoose.model("Owner", OwnerSchema)
