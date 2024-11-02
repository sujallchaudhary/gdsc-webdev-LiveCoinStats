const fetchCryptoPrice = require('../utils/fetchCryptoPrice');

const getAllCryptoPrice = async (req,res) => {
    try{
        const currency = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'DOGEUSDT'];
        let data = await Promise.all(currency.map(async (symbol) => {
            return await fetchCryptoPrice(symbol);
        }));
        if(data){
            res.status(200).json({success:true,status:200,data,message:"Crypto price fetched successfully"});
        }
        else{
            res.status(200).json({success:false,status:400,message:'No data found'});
        }
    }
    catch(error){
        res.status(200).json({success:false,status:500,message:'Internal server error'+error});

    }
};

module.exports = {getAllCryptoPrice };