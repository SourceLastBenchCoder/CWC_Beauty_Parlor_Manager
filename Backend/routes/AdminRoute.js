const express = require("express")
const router = express.Router()
const { getAdmin, getAdminById, createAdmin, updateAdmin, login } = require("../controller/AdminController")

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

router.get("/", getAdmin)
router.get("/:id", getAdminById)
router.post("", upload.single("admin"), createAdmin)
router.post("/login", login)
router.put("/:id", upload.single("admin"), updateAdmin)

module.exports = router