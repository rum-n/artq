
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
const User = require("../models/user");
const Dummy_Users = [
    {id: "u1",
    name: "Nandita",
    email: "Nandita1227@gmail.com",
    password:"test",
    phone: "(123)-456-789"}
]


const getUsers = (req,res,next) =>{
    res.json({users:Dummy_Users})
};
const signup = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next( new HttpError("Invalid inputs passed, please check your data",422));

    }
    const {name,email,password,phone,image} = req.body;
    let existingUser
    try{
    existingUser = await User.findOne({email:email})
    } catch (err){
        const error = new HttpError(
            "Signin uou failed",500
        );
        return next(error);
    }

    if (existingUser){
        const error = new HttpError(
            "User exists already, please login instead",422
        );
        return next(error);
    }

    const createdUser = new User({
        name,
        email,
        password,
        phone,
        image
    });
    try{
        await createdUser.save();
    }catch(err){
        const error = new HttpError(
            "Signingg up failed", 500
        );
        return next(error);
    }
    

    res.status(201).json({user:createdUser.toObject({getters:true})});
};
const login = (req,res,next) =>{
    const{email,password} = req.body;
    const identifiedUser = Dummy_Users.find(u => u.email ===email);
    if(!identifiedUser || identifiedUser.password !== password){
        return next( new HttpError("Could not identify user, 401"))
    }
    res.json({message: "Logged in!"});
};

exports.getUsers = getUsers;
exports.signup = signup
exports.login = login;