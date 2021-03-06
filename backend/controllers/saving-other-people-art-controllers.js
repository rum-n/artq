const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error');
const getCoordsForAddress = require("../util/location")
const Image = require('../models/image');
const User = require("../models/user")
const Save = require("../models/save")
const fs = require('fs')
const mongoose = require("mongoose")




const getArtByUser = async (req,res,next)=>{
    const userId = req.params.uid;
    let userWithImages
    try{
        console.log(Save)
        userWithImages = await Save.find({user1:userId})
        console.log(userWithImages)
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find image from provided user id", 500
        );
        return next(error);}



    if (!userWithImages || userWithImages.length === 0){
        return next(
            new HttpError("Could not find a image for the provided user id",404)
        );
    }
    res.json({userWithImages: userWithImages.map(userWithImages => userWithImages.toObject({getters:true}))})

}
const saveArt = async (req,res,next) => {
   
    const {title,url,description,dimentions,price,style,author,likes,type,peoplewholiked,duration,medium,address,user1} = req.body;
    let coordinates;
    try{
      coordinates = await getCoordsForAddress(address)
    } catch(error){
        return next(error)
    }
    const savedArt = new Save({
        title,
        description,
        likes,
        dimentions:5,
        price,
        address,
        location: {
        
            lat:(coordinates.lat),
            long: (coordinates.lng) 
            },
         
        url,
        type,
        duration,
        medium,
        style,
        author,
        user1,
        likes,
        peoplewholiked
    });
   
   
    let user;
    try{
       user =  await User.findById(user1)
       console.log(user)

     }catch(err){
         console.log("hoi")
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
      console.log("yuh")
      sess.startTransaction();
      console.log("yuh")
      await savedArt.save({session:sess});
      console.log("yuh")
      user.savedimage.push(savedArt);
      console.log("yuh")
     await user.save({session:sess});
      await sess.commitTransaction();
     } catch(err){
         console.log(err)
         const error = new HttpError("Saving Image failed",500);
    
     return next(error)
     }
    res.status(201).json({art:savedArt});


};


const deleteImage = async (req,res,next) =>{
    const imageId = req.params.imgid;
    let image;
    try{
        image = await Save.findById(imageId).populate("author");
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



exports.getArtByUser = getArtByUser;
exports.saveArt = saveArt;
exports.deleteImage = deleteImage;