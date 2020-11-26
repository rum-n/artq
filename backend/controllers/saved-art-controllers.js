const { v4: uuidv4 } = require('uuid');
const {validationResult} = require('express-validator')
const HttpError = require('../models/http-error');
const getCoordsForAddress = require("../util/location")
const Image = require('../models/image');
const image = require('../models/image');
const { findAllByPlaceholderText } = require('@testing-library/react');
let Dummy_Images = [
    {
    "id": "1",   
    "title": "PaintingTitle1",
    "url":"https://s3.imgcdn.dev/cSCIB.png",
    "cost": 400,
    "author": "USER",
    "address": "421 Amsterdam Ave New York USA",
    "location": { 
      lat: 41.3954,
      lng: 2.162 
    }
}
];
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
    let images;
    try{
    images = await Image.find({author: userId});
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not find image from provided user id", 500
        );
        return next(error);}



    if (!images || images.length === 0){
        return next(
            new HttpError("Could not find a user for the provided user id",404)
        );
    }
    res.json({images: images.map(image => image.toObject({getters:true}))})

}
const saveArt = async (req,res,next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        console.log(errors)
        return next (new HttpError("Invalid inputs passed, please check your data",422))

    }
    const {title,url,description,cost,author,address} = req.body;
    let coordinates;
    try{
      coordinates = await getCoordsForAddress(address)
    } catch(error){
        return next(error)
    }
    const savedArt = new Image({
        title,
        description,
        address,
        location:coordinates,
        url:"https://s3.imgcdn.dev/cSCIB.png",
        author
    });
    try{
    await savedArt.save();
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
    const {title,url,cost} = req.body;
    const imageId = req.params.imgid;
    let image;
    try{
        image = await Image.findById(imageId)
        
    } catch(err){
        const error = new HttpError(
            "Something went wrong, could not update art", 500
        );
        return next(error)
    }

    image.title = title;
    image.url = url;
    image.cost = cost;

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
        image = await Image.findById(imageId)
    }catch(err){
        const error = new HttpError(
            "Something went wrong, could not delete art", 500
        );
        return next(error);
    }
    try{
        await image.remove();
    }catch(err){
        const error = new HttpError(
            "Something went wrong, could not update art", 500
        );
        return next(error);
    }
    res.status(200).json({message:'Deleted art'})

};

exports.getArtById = getArtById;
exports.getArtByUser = getArtByUser;
exports.saveArt = saveArt;
exports.updateImage = updateImage;
exports.deleteImage = deleteImage;