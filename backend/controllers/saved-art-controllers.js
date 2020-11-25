const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const Dummy_Images = [
    {
    "id": "1",   
    "title": "PaintingTitle1",
    "url":"https://s3.imgcdn.dev/cSCIB.png",
    "cost": 400,
    "author": "USER",
    "location": { 
      lat: 41.3954,
      lng: 2.162 
    }
}
];
const getArtById = (req,res,next) => {
    const imageId = req.params.imgid
    const image = Dummy_Images.find(i =>{
        return i.id = imageId;
    });
    if (!image){
        throw new HttpError("Could not find image of provided id",400);
        
    }
    res.json({image});
}
const getArtByUser = (req,res,next)=>{
    const userId = req.params.uid;
    const image = Dummy_Images.find(p=>{
        return p.author === userId;
    });
    if (!image){
        return next(
            new HttpError("Could not find a user for the provided user id",404)
        );
    }
    res.json({image})

}
const saveArt = (req,res,next) => {
    const {title,url,cost,author} = req.body;
    const savedArt = {
        id: uuidv4(),
        title,
        url, 
        cost,
        author
    };
    Dummy_Images.push(savedArt)
    res.status(201).json({art:savedArt});

};

exports.getArtById = getArtById;
exports.getArtByUser = getArtByUser;
exports.saveArt = saveArt;