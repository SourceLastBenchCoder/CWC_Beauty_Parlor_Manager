require("dotenv").config()
const mongoose = require("mongoose")
mongoose.set("strictQuery", false);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("CONNECTED TO MONGO DB SUCCESSFULLY")
    } catch (error) {
        console.log("MONGO DB CONNECTIVITY FAILED")
        process.exit(1)
    }
}

module.exports = connectDB