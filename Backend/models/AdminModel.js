const mongoose = require("mongoose")
const { BASE_URL } = require("../constants/AppConstants")

const AdminSchema = mongoose.Schema({
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
    password: {
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
    isSuperAdmin: {
        type: Boolean,
        required: true
    },
    status: {
        type: String,
        default: "In-Active"
    }
}, { timestamp: true })

const Admin = mongoose.model("Admin", AdminSchema)

module.exports = Admin