const router = require("express").Router()
const Product = require("../models/product")
const upload = require("../middlewares/upload-photo")

// Create a new product
router.post("/product", upload.single("photo"), async (req, res) => {
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

// Get all products
router.get("/products", async (req, res) => {
	try {
		let products = await Product.find()
		res.json({
			success: true,
			products,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

// Get a single product
router.get("/product/:id", async (req, res) => {
	try {
		let product = await Product.findOne({ _id: req.params.id })
		res.json({
			success: true,
			product,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

// Update a product
router.put("/product/:id", upload.single("photo"), async (req, res) => {
	try {
		let updatedProduct = await Product.findOneAndUpdate(
			{ _id: req.params.id },
			{
				$set: {
					title: req.body.title,
					description: req.body.description,
					photo: req.file.location,
					price: req.body.price,
					owner: req.body.ownerID,
					category: req.body.categoryID,
				},
			},
			{ upsert: true }
		)
		res.json({
			success: true,
			product: updatedProduct,
		})
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

// Delete a product
router.delete("/product/:id", async (req, res) => {
	try {
		let deletedProduct = await Product.findOneAndDelete({
			_id: req.params.id,
		})

		if (deletedProduct) {
			res.json({
				success: true,
				message: "Product successfully deleted",
			})
		}
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		})
	}
})

module.exports = router
