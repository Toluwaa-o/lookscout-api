const express = require('express')
const { createUser, imageUpload, updateInfo, getUsers, getInfo } = require('../controllers/adminControllers')

const router = express.Router()

router.route('/user').post(createUser).get(getUsers)
router.route('/info').get(getInfo)
router.route('/update').patch(updateInfo)
router.route('/upload').post(imageUpload)

module.exports = router