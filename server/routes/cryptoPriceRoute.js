const express= require('express');
const router = express.Router();
const {getAllCryptoPrice} = require('../controllers/cryptoPriceApiController');
const jwt = require('../middlewares/jwt');

router.get('/all',jwt,getAllCryptoPrice);

module.exports = router;