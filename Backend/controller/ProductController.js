const { default: mongoose } = require("mongoose")
const Product = require("../models/ProductModel")

const getProduct = async (req, res, next) => {
    try {
        const ProductData = await Product.find({}).sort({ fullname: "asc" })
        res.send(ProductData)
    } catch (error) {
        next(error)
    }
}

const getProductById = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const ProductData = await Product.findById(req.params.id)

        res.json(ProductData)
    } catch (error) {
        next(error)
    }
}

const createProduct = async (req, res, next) => {
    try {
        console.log(req.body)
        const ProductData = await Product.find({ title: req.body.title })
        if (ProductData.length > 0) {
            res.status(200).json({ "message": "Oops! Product Title Already exists, please try with different emailid", "status": "error" })
        } else {
            const newProduct = new Product(req.body)

            if (req.files) {
                req.files.map(async (file) => {
                    newProduct.banner.push('http://localhost:8080/' + file.filename)
                });
            }

            newProduct.save()
            res.status(201).json({ "message": "Success! Product Created successfully and admi Id is " + newProduct._id, "status": "success" })
        }
    } catch (error) {
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try {
        console.log(req.file)
        const ProductData = Product.findById({ _id: req.params.id })
        if (!ProductData) {
            res.status(200).json({ "message": "Oops! Cannot update, Product id is invalid " })
        } else {

            if (req.files) {
                req.files.map(async (file) => {
                    req.body.banner.push('http://localhost:8080/' + file.filename)
                });
            }

            await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(201).json({ "message": "Success! Product Password updated successfully" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getProduct, getProductById, createProduct, updateProduct }