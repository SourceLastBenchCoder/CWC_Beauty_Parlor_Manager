const { default: mongoose } = require("mongoose")
const bcryptjs = require("bcryptjs")
const Admin = require("../models/AdminModel")

const getAdmin = async (req, res, next) => {
    try {
        const adminData = await Admin.find({}).sort({ fullname: "asc" })
        res.send(adminData)
    } catch (error) {
        next(error)
    }
}

const login = async (req, res, next) => {
    try {
        const admin = await Admin.findOne({ $and: [{ "email": req.body.email }, { "status": "Active" }] })
        if (admin === null) {
            res.status(200).json({ "message": "Oops! Login failed, EmailId Does not exists or Status is InActive", "status": "error" })
        }
        else {
            const verified = bcryptjs.compareSync(req.body.password, admin.password);
            if (verified)
                res.json(admin)
            else
                res.status(200).json({ "message": "Oops! Login failed, Invalid Password", "status": "error" })

        }

    } catch (error) {
        next(error)
    }
}

const getAdminById = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const adminData = await Admin.findById(req.params.id)

        res.json(adminData)
    } catch (error) {
        next(error)
    }
}

const createAdmin = async (req, res, next) => {
    try {
        const adminData = await Admin.find({ email: req.body.email })
        if (adminData.length > 0) {
            res.status(200).json({ "message": "Oops! Email Id Already exists, please try with different emailid", "status": "error" })
        } else {
            const newAdmin = new Admin(req.body)
            newAdmin.password = bcryptjs.hashSync(req.body.password, 10)
            if (req.file.filename)
                newAdmin.banner = 'http://localhost:8080/' + req.file.filename
            newAdmin.save()
            res.status(201).json({ "message": "Success! Admin Created successfully and admi Id is " + newAdmin._id, "status": "success" })
        }
    } catch (error) {
        next(error)
    }
}

const updateAdmin = async (req, res, next) => {
    try {
        const adminData = await Admin.findOne({ _id: req.params.id })
        if (!adminData) {
            res.status(200).json({ "message": "Oops! Cannot update, Admin id is invalid " })
        } else {
            if (req.body.password)
                req.body.password = bcryptjs.hashSync(req.body.password, 10)

            if (req.file != undefined)
                req.body.banner = 'http://localhost:8080/' + req.file.filename

            await Admin.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(201).json({ "message": "Success! Admin Detail updated successfully" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getAdmin, getAdminById, createAdmin, updateAdmin, login }