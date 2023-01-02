const express = require("express")
const router = express.Router()
const { getProduct, getProductById, createProduct, updateProduct } = require("../controller/ProductController")

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

router.get("/", getProduct)
router.get("/:id", getProductById)
router.post("", upload.array("Product", 10), createProduct)
router.put("/:id", upload.array("Product", 10), updateProduct)

module.exports = router