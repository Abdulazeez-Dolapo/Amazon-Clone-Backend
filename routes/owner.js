const router = require("express").Router()
const Owner = require("../models/owner")

// Create a new owner
router.post("/owner", async (req, res) => {
	try {
		let owner = new Owner()
		owner.name = req.body.name
		owner.about = req.body.about

		await owner.save()

		res.json({
			success: true,
			message: "Successfully created a new owner",
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

// Get all owners
router.get("/owners", async (req, res) => {
	try {
		let owners = await Owner.find()
		res.json({
			success: true,
			owners,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

module.exports = router
