const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error');
const getCoordsForAddress = require("../util/location")
const Image = require('../models/image');
const User = require("../models/user")
const mongoose = require("mongoose")
const { findAllByPlaceholderText } = require('@testing-library/react');

const getAllArt= async (req,res,next) => {
    let image;
    try{
        image = await Image.find({},'-password');
    } catch(err){
        const error = new HttpError(
            "Fetching users failed", 500
        );
        return next(error)
    }
    res.json({image:image.map(image => image.toObject({getters:true}))});

}
const getArtById = async (req,res,next) => {
    const imageId = req.params.imgid
    let image;
    try{
    image = await Image.findById(imageId);
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find image", 500
        );
        return next(error);
    }
    if (!image){
        const error =  new HttpError("Could not find image of provided id",400);
    return next(error);
    }
    res.json({image:image.toObject({getters:true})});
};
const getArtByUser = async (req,res,next)=>{
    const userId = req.params.uid;
    let userWithImages
    try{
        userWithImages = await Image.find({author:userId})
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find image from provided user id", 500
        );
        return next(error);}



    if (!userWithImages || userWithImages.length === 0){
        return next(
            new HttpError("Could not find a user for the provided user id",404)
        );
    }
    res.json({userWithImages: userWithImages.map(userWithImages => userWithImages.toObject({getters:true}))})

}
const saveArt = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next (new HttpError("Invalid inputs passed, please check your data",422))

    }
    const {title,url,description,dimentions,price,author,type,duration,medium,address} = req.body;
    let coordinates;
    try{
      coordinates = await getCoordsForAddress(address)
     
      console.log("rhe cooordinates"+coordinates)
    } catch(error){
        return next(error)
    }
    const savedArt = new Image({
        title,
        description,
        dimentions,
        price,
        address,
        location: {
        
            lat:(coordinates.lat),
            long: (coordinates.lng) //it works when you put in actual coordinates
            },
         
        url,
        type,
        duration,
        medium,
        author
    });
   
    console.log(savedArt)
    let user;
    try{
       user =  await User.findById(author)
       console.log(user)
     }catch(err){
         const error = new HttpError(
          "Creating place failed",500
       );
         return next(error);
     }
     if (!user){
         console.log("error dawg")
         const error = new HttpError("Could not find user for provided id",404)
         return next(error)
     }

     try{
      const sess = await mongoose.startSession();
      console.log("hi")
      sess.startTransaction();
      console.log("hi")
      await savedArt.save({session:sess});
      console.log("hi")
      user.image.push(savedArt);
      console.log("hi")
     await user.save({session:sess});
     console.log("hi")
      await sess.commitTransaction();
      console.log("hi")
     } catch(err){
         const error = new HttpError("Saving Image failed",500);
    
     return next(error)
     }
    res.status(201).json({art:savedArt});


};

const updateImage = async (req,res,next) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next(new HttpError("Invalid inputs passed, please check your data",422))

    }
    const {title,url,description,dimentions,price,type,duration,medium,author,address} = req.body;
    const imageId = req.params.imgid;
    let image;
    try{
        image = await Image.findById(imageId)
        console.log("THE IMAGE ID "+ imageId)
        
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not update art", 500
        );
        return next(error)
    }

    image.title = title;
    image.url = url;
    image.description = description;
    image.price = price;
    image.author = author;
    image.duration = duration;
    image.type = type;
    image.medium = medium;
    image.address = address;


   try{
       await image.save();
   }catch(err){
       const error = new HttpError(
           "Something went wrong, could not update art", 500
       );
       return next(error);
   }
    res.status(200).json({image:image.toObject({getters:true})});

};
const deleteImage = async (req,res,next) =>{
    const imageId = req.params.imgid;
    let image;
    try{
        image = await Image.findById(imageId).populate("author");
    }catch(err){
        const error = new HttpError(
            "Something went wrong, could not delete art", 500
        );
        return next(error);
    }
     if (!image){
        const error = new HttpError("Could not find image for this id",404);
        return next(error);
     }


    try{
         const sess = await mongoose.startSession();
         sess.startTransaction();
         await image.remove({session:sess});
         image.author.image.pull(image);
         await image.author.save({session:sess});
         await sess.commitTransaction();
        
        
      
    }catch(err){
        const error = new HttpError(
            "Something went wrong, could not delete art", 500
        );
        return next(error);
    }
    res.status(200).json({message:'Deleted art'})

};

exports.getAllArt = getAllArt;
exports.getArtById = getArtById;
exports.getArtByUser = getArtByUser;
exports.saveArt = saveArt;
exports.updateImage = updateImage;
exports.deleteImage = deleteImage;