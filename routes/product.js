const router = require("express").Router()
const Product = require("../models/product")
const upload = require("../middlewares/upload-photo")

router.post("/products", upload.single("photo"), async (req, res) => {
	try {
		let newProduct = new Product()
		newProduct.title = req.body.title
		newProduct.description = req.body.description
		newProduct.photo = req.file.location
		newProduct.price = req.body.price
		newProduct.stockQuantity = req.body.stockQuantity

		const product = await newProduct.save()

		res.json({
			product,
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
