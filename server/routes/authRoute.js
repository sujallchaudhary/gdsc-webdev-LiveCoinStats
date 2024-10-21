const express = require('express');
const router = express.Router();
const jwt=require('../middlewares/jwt');

const {userLogin, userRegister,fetchUsers} = require('../controllers/authController');

router.post('/signup', userRegister);
router.post('/login', userLogin);
router.get('/users',jwt, fetchUsers);

module.exports = router;