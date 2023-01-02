const mongoose = require("mongoose")
const { BASE_URL } = require("../constants/AppConstants")

const CategorySchema = mongoose.Schema({
    title: {
        type: String,

        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    admin: {
        _id: {
            type: Object,
            required: true
        },
        fullname: {
            type: String,
            required: true
        }
    },
    status: {
        type: String,
        default: "In-Active"
    }
}, { timestamp: true })

const Category = mongoose.model("Category", CategorySchema)

module.exports = Category