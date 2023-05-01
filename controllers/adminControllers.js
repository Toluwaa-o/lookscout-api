const User = require('../model/user')
const CustomErrors = require('../errors')
const path = require('path')
const Info = require('../model/info')

const createUser = async (req, res) => {
    const { name, email } = req.body

    if(!name || !email) throw new CustomErrors.BadRequestError('Please provide a name and an email')

    const user = await User.create({name, email})
    res.status(201).json({ user })
}

const imageUpload = async (req, res) => {
    const { image: logo } = req.files

    const maxSize = 1024 * 1024

    if(logo.size > maxSize) throw new CustomErrors.BadRequestError('Image cannot be bigger than 1mb')

    if(!logo.mimetype.startsWith('image')) throw new CustomErrors.BadRequestError('Please upload an image')

    const imgPath = path.join(__dirname, '../public/uploads/' + `${logo.name}`)
    
    await logo.mv(imgPath)

    res.status(200).json({ src: `https://lookscout-ig7v.onrender.com/uploads/${logo.name}`})
}

const updateInfo = async (req, res) => {
    const { button, lightMode, darkMode } = req.body

    const info = await Info.findOneAndUpdate({}, req.body, { new: true, runValidators: true })

    res.status(200).json({ info })
}

const getUsers = async (req, res) => {
    const users = await User.find({})

    res.status(200).json({ users })
}

const getInfo = async (req, res) => {
    const info = await Info.findOne({})

    res.status(200).json({ info })
}

module.exports = { createUser, imageUpload, updateInfo, getUsers, getInfo }
