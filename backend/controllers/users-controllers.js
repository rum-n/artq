
const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
const User = require("../models/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getUsers = async (req,res,next) =>{
    let users;
    try{
     users = await User.find({},'-password');
    } catch(err){
        const error = new HttpError(
            "Fetching users failed", 500
        );
        return next(error)
    }
    res.json({users:users.map(user => user.toObject({getters:true}))});

};
const profileById = async (req,res,next)=>{
    const userId = req.params.uid;
    let userWithImages
    try{
        userWithImages = await User.findById(userId)
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find image from provided user id", 500
        );
        return next(error);}



  
    res.json({userWithImages:userWithImages})

}
const signup = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next( new HttpError("Invalid inputs passed, please check your data",422));

    }
    const {name,email,password,phone} = req.body;
    let existingUser
    try{
    existingUser = await User.findOne({email:email})
    } catch (err){
        const error = new HttpError(
            "Signing in failed",500
        );
        return next(error);
    }

    if (existingUser){
        const error = new HttpError(
            "User exists already, please login instead",422
        );
        return next(error);
    }
    let hashedPassword;
    try{
    hashedPassword= await bcrypt.hash(password,12)
    }catch(err){
        const error = new HttpError(
            'Could not create user, please try again.',500
        );
        return next(error)
    }


    const createdUser = new User({
        name,
        email,
        password:hashedPassword,
        phone,
        image:[],
        savedimages:[]
    });
    try{
        await createdUser.save();
    }catch(err){
        const error = new HttpError(
            "Signingg up failed", 500
        );
        return next(error);
    }
    let token;
    try{
   
    token = jwt.sign({userId:createdUser.id,email:createdUser.email},"super sectret",{expiresIn:'1h'})
    }catch(err){
        const error = new HttpError(
            "Signingg up failed", 500
        );
        return next(error);
    }
    res.status(201).json({userId:createdUser.id,email:createdUser.email,token:token});
};
const login = async (req,res,next) =>{
    const{email,password} = req.body;
    let existingUser
    try{
    existingUser = await User.findOne({email:email})
    } catch (err){
        const error = new HttpError(
            "Signing in failed",500
        );
        return next(error);
    }
    if (!existingUser ){
       
        const error = new HttpError(
            "Invalid Credentials", 401
        );
        return next(error);
    }

    let isValidPassword = false;
    try{
    isValidPassword = await bcrypt.compare(password,existingUser.password);
    } catch(err){
      
        const error = new HttpError(
            'Could not log you in, check credentials',500
        )
        return next(error);
    }
    if (!isValidPassword){
        alert("this one")
        const error = new HttpError(
            'Could not log you in, check credentials',500
        )
        return next(error);

    }
    let token;
    try{
       
        token = jwt.sign({userId:existingUser.id,email:existingUser.email},"super sectret",{expiresIn:'1h'})
        }catch(err){
            const error = new HttpError(
                "Logging in failed", 500
            );
            return next(error);
        }
    

    res.json({userId:existingUser.id,email:existingUser.email,token:token});
};

exports.profileById = profileById;
exports.getUsers = getUsers;
exports.signup = signup
exports.login = login;