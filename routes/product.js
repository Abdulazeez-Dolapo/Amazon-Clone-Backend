const router = require("express").Router()
const Product = require("../models/product")
const upload = require("../middlewares/upload-photo")

router.post("/product", upload.single("photo"), async (req, res) => {
	try {
		let product = new Product()
		product.title = req.body.title
		product.description = req.body.description
		product.photo = req.file.location
		product.price = req.body.price
		product.stockQuantity = req.body.stockQuantity

		const prod = await product.save()

		res.json({
			prod,
			status: true,
			message: "Successfully saved",
		})
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		})
	}
})

module.exports = router
