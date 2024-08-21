const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profileController')
const authController = require('../controllers/authController')
const {
    requireAuth,
    checkUser,
} = require("../middleware/authMiddleware");


// router.use(authController.protect)
// router.use(authController.restrictTo('user'))

router.get('/profiles', profileController.getAllProfile)
router.post('/profiles', profileController.createProfile)
router.put('/profiles/:id', profileController.updateProfile)
router.delete('/profiles/:id', profileController.deleteProfile)

router.post('/comment', profileController.profileComment)

module.exports = router;
