const express = require("express")
require("dotenv").config()
const cors = require("cors")
const apiRoutes = require("./routes/ApiRoute")

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static("public"))

const connectDB = require("./config/db")
connectDB()

app.get("/", (req, res, next) => {
    res.status(200).json({
        message: "API Running successfully",
        status: "Active",
        timestamp: new Date()
    })
})

app.use((error, req, res, next) => {
    res.status(500).json({
        message: error.message,
        stack: error.stack
    })
})

app.use("/api", apiRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log("SERVER STARTED SUCCESSFULLY")
})