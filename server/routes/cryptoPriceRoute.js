const express= require('express');
const router = express.Router();
const {getCryptoPrice, getAllCryptoPrice} = require('../controllers/cryptoPriceApiController');
const jwt = require('../middlewares/jwt');

router.get('/',jwt,getCryptoPrice);
router.get('/all',jwt,getAllCryptoPrice);

module.exports = router;