
const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator');
const HttpError = require('../models/http-error');
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
const signup = (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        throw new HttpError("Invalid inputs passed, please check your data",422)

    }
    const {name,email,password,phone} = req.body;

    const hasUser = Dummy_Users.find(u => u.email ===email);
    if (hasUser){
        throw new HttpError("email already exists, 422")

    }

    const createdUser = {
        id:uuidv4(),
        name,
        email,
        password,
        phone

    };
    Dummy_Users.push(createdUser);
    res.status(201).json({user:createdUser});
};
const login = (req,res,next) =>{
    const{email,password} = req.body;
    const identifiedUser = Dummy_Users.find(u => u.email ===email);
    if(!identifiedUser || identifiedUser.password !== password){
        throw new HttpError("Could not identify user, 401")
    }
    res.json({message: "Logged in!"});
};

exports.getUsers = getUsers;
exports.signup = signup
exports.login = login;