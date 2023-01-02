const { default: mongoose } = require("mongoose")
const Beautician = require("../models/BeauticianModel")

const getBeautician = async (req, res, next) => {
    try {
        const BeauticianData = await Beautician.find({}).sort({ fullname: "asc" })
        res.send(BeauticianData)
    } catch (error) {
        next(error)
    }
}

const getBeauticianById = async (req, res, next) => {
    try {
        console.log(req.params.id)
        const BeauticianData = await Beautician.findById(req.params.id)

        res.json(BeauticianData)
    } catch (error) {
        next(error)
    }
}

const createBeautician = async (req, res, next) => {
    try {
        const BeauticianData = await Beautician.findOne({ email: req.body.email })
        if (BeauticianData) {
            res.status(200).json({ "message": "Oops! Email Id Already exists, please try with different emailid", "status": "error" })
        } else {
            const newBeautician = new Beautician(req.body)
            if (req.file.filename)
                newBeautician.banner = 'http://localhost:8080/' + req.file.filename
            newBeautician.save()
            res.status(201).json({ "message": "Success! Beautician Created successfully and admi Id is " + newBeautician._id, "status": "success" })
        }
    } catch (error) {
        next(error)
    }
}

const updateBeautician = async (req, res, next) => {
    try {
        const BeauticianData = await Beautician.findOne({ _id: req.params.id })
        if (!BeauticianData) {
            res.status(200).json({ "message": "Oops! Cannot update, Beautician id is invalid " })
        } else {
            if (req.file != undefined)
                req.body.banner = 'http://localhost:8080/' + req.file.filename

            await Beautician.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(201).json({ "message": "Success! Beautician Detail updated successfully" })
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { getBeautician, getBeauticianById, createBeautician, updateBeautician }