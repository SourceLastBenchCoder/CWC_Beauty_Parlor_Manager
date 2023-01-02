const express = require("express")
const router = express.Router()
const { getBeautician, getBeauticianById, createBeautician, updateBeautician } = require("../controller/BeauticianController")

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

router.get("/", getBeautician)
router.get("/:id", getBeauticianById)
router.post("", upload.single("Beautician"), createBeautician)
router.put("/:id", upload.single("Beautician"), updateBeautician)

module.exports = router