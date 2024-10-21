const fetchCryptoPrice = require('../utils/fetchCryptoPrice');

const getCryptoPrice = async (io,currency) => {
    setInterval(async () => {
        try {

            if(!currency){
                currency = 'BTCUSDT';
            }
            const data = await fetchCryptoPrice(currency);
            if (data) {
                io.emit('cryptoPrice', data);
            } else {
                io.emit('cryptoPrice', {});
            }
        } catch (error) {
            io.emit('error', error);
        }
    }, 5000);
}
const getAllCryptoPrice = async (io) => {
    setInterval(async () => {
        const currency = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'DOGEUSDT'];
        
        try {
            let data = await Promise.all(currency.map(async (symbol) => {
                return await fetchCryptoPrice(symbol);
            }));
            if (data) {
                io.emit('allCurrency', data);
            } else {
                io.emit('allCurrency', {});
            }
        } catch (error) {
            io.emit('error', error);
        }
    }, 5000);
};

module.exports = { getCryptoPrice, getAllCryptoPrice };
