const { default: mongoose } = require("mongoose")
const Category = require("../models/CategoryModel")

const getCategory = async (req, res, next) => {
    try {
        const CategoryData = await Category.find({}).sort({ fullname: "asc" })
        res.send(CategoryData)
    } catch (error) {
        next(error)
    }
}

const getCategoryById = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const CategoryData = await Category.findById(req.params.id)

        res.json(CategoryData)
    } catch (error) {
        next(error)
    }
}

const createCategory = async (req, res, next) => {
    try {
        console.log(req.body)
        const CategoryData = await Category.find({ title: req.body.title })
        if (CategoryData.length > 0) {
            res.status(200).json({ "message": "Oops! Category Title Already exists, please try with different emailid", "status": "error" })
        } else {
            const newCategory = new Category(req.body)
            if (req.file.filename)
                newCategory.banner = 'http://localhost:8080/' + req.file.filename
            newCategory.save()
            res.status(201).json({ "message": "Success! Category Created successfully and admi Id is " + newCategory._id, "status": "success" })
        }
    } catch (error) {
        next(error)
    }
}

const updateCategory = async (req, res, next) => {
    try {
        console.log(req.file)
        const CategoryData = Category.findById({ _id: req.params.id })
        if (!CategoryData) {
            res.status(200).json({ "message": "Oops! Cannot update, Category id is invalid " })
        } else {

            if (req.file != undefined)
                req.body.banner = 'http://localhost:8080/' + req.file.filename

            await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(201).json({ "message": "Success! Category Password updated successfully" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getCategory, getCategoryById, createCategory, updateCategory }