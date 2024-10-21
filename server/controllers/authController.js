const jwtwebtoken = require('jsonwebtoken'); 
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

const userRegister = async (req, res) => {
    try{
        const {userName, email, password} = req.body;
        const ePassword = await bcrypt.hash(password, 10);
        userCheck = await User.findOne({email});
        if(userCheck){
            return res.status(200).json({success:false,status:400,message:'User already exists'});
        }
        const user = await User.create({userName, email, password:ePassword});
        if(!user){
            return res.status(200).json({success:false,status:400,message:'User registration failed'});
        }
        const token = jwtwebtoken.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '15d'});
        user.password = undefined;
        res.status(200).json({success:true,status:200,token, message:'User registered successfully',data:user});
    }
    catch(error){
        res.status(200).json({success:false,status:500,message:'Internal server error'+error});
    }
};
const userLogin = async (req, res) => {
    try{
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(200).json({success:false,status:400,message:'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(200).json({success:false,status:400,message:'Invalid credentials'});
        }
        const token = jwtwebtoken.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '15d'});
        user.password = undefined;

        res.status(200).json({success:true,status:200,token, message:'User logged in successfully',data:user});
    }
    catch(error){
        res.status(200).json({success:false,status:500,message:'Internal server error'+error});
    }
};

const fetchUsers = async (req, res) => {
    try{
        const users = await User.find();
        if(!users){
            return res.status(200).json({success:false,status:400,message:'No users found'});
        }
        res.status(200).json({success:true,status:200,message:'Users fetched successfully',data:users});
    }
    catch(error){
        res.status(200).json({success:false,status:500,message:'Internal server error'+error});
    }
};

module.exports = {userRegister, userLogin, fetchUsers};