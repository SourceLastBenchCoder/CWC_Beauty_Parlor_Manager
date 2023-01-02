const express = require("express")
const adminRoute = require("./AdminRoute")
const categoryRoute = require("./CategoryRoute")
const beauticianRoute = require("./BeauticianRoute")
const productRoute = require("./ProductRoute")

const app = express()

app.use("/admin", adminRoute)
app.use("/category", categoryRoute)
app.use("/beautician", beauticianRoute)
app.use("/product", productRoute)

module.exports = app