const express = require('express')
const router = express.Router()
// const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

// auth User
router.route('/signup').post(authController.signup)
router.route('/login').post(authController.login)

module.exports = router;
