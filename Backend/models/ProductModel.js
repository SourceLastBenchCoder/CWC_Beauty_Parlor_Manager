const mongoose = require("mongoose")
const { BASE_URL } = require("../constants/AppConstants")

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: true
    },
    smalldesc: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    banner: [
        {
            type: String,
            required: true
        }
    ],
    price: {
        type: Number,
        required: true
    },
    totaltime: {
        type: Number,
        required: true
    },
    category: {
        _id: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }
    ,
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

const Product = mongoose.model("Product", ProductSchema)

module.exports = Product