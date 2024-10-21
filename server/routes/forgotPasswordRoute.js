const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/jwtPassword');

const {forgotPassword, resetPassword} = require('../controllers/forgotPasswordController');

router.post('/forgotPassword', forgotPassword);
router.post('/resetPassword',verifyToken, resetPassword);

module.exports = router;