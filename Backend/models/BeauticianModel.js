const mongoose = require("mongoose")
const { BASE_URL } = require("../constants/AppConstants")

const BeauticianSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        default: BASE_URL + "user.png"
    },
    achievements: [
        {
            custname: {
                type: String
            },
            custemail: {
                type: String
            },
            custcomment: {
                type: String
            },
            rating: {
                type: Number
            }
        }
    ],
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

const Beautician = mongoose.model("Beautician", BeauticianSchema)

module.exports = Beautician