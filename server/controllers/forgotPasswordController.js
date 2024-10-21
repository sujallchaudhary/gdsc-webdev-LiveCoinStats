const User = require('../models/userModel');
const sendEmail = require('../utils/sendEmail');
const jwtwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(200).json({success:false,status:400,message:'User not found'});
        }
        const token = jwtwebtoken.sign({id: user._id,email:user.email}, process.env.JWT_P_SECRET, {expiresIn: '10m'});
        const resetUrl='https://gdsc.sujal.info/resetpassword?secret='+token;
        if(sendEmail(user.email,"Password reset link","",`<p>Click on the link to reset your password </p><a href='${resetUrl}' target='_blank'>click here</a>`)){
            res.status(200).json({success:true,status:200,message:'Password reset link sent to your email'});
        }
        else{
            res.status(200).json({success:false,status:500,message:'Email sending failed'});
        }    
    } catch (error) {
        res.status(200).json({success:false,status:500,message:'Internal server error'+error});
    }

};
const resetPassword = async (req, res) => {
    try {
        const {password,email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(200).json({success:false,status:400,message:'User not found'});
        }
        const ePassword = await bcrypt.hash(password, 10);
        user.password = ePassword;
        await user.save();
        res.status(200).json({success:true,status:200,message:'Password reset successfully'});
    } catch (error) {
        res.status(200).json({success:false,status:500,message:'Internal server error'+error});
        
    }
};

module.exports = {forgotPassword, resetPassword};