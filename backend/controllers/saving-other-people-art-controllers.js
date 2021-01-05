const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error');
const getCoordsForAddress = require("../util/location")
const Image = require('../models/image');
const User = require("../models/user")
const Save = require("../models/save")
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
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next (new HttpError("Invalid inputs passed, please check your data",422))

    }
    const {title,url,description,dimentions,price,author,type,duration,medium,address,user1} = req.body;
    let coordinates;
    try{
      coordinates = await getCoordsForAddress(address)
    } catch(error){
        return next(error)
    }
    const savedArt = new Save({
        title,
        description,
        dimentions,
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
        author,
        user1
    });
   
   
    let user;
    try{
       user =  await User.findById(user1)
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