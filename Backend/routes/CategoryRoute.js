const express = require("express")
const router = express.Router()
const { getCategory, getCategoryById, createCategory, updateCategory } = require("../controller/CategoryController")

const multer = require("multer")
var path = require("path")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

router.get("/", getCategory)
router.get("/:id", getCategoryById)
router.post("", upload.single("Category"), createCategory)
router.put("/:id", upload.single("Category"), updateCategory)

module.exports = router