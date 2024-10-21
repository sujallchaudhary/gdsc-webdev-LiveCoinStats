const axios = require('axios');

const getCryptoPrice = async (symbol) => {
    try{
        const response = await axios.get('https://api.binance.com/api/v3/ticker/price?symbol='+symbol);
        return response.data;
    }
    catch(error){
        return error;
    }
}

module.exports = getCryptoPrice;