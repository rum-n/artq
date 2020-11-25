const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
let Dummy_Images = [
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
    const images = Dummy_Images.filter(p=>{
        return p.author === userId;
    });
    if (!images || images.length === 0){
        return next(
            new HttpError("Could not find a user for the provided user id",404)
        );
    }
    res.json({images})

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

const updateImage = (req,res,next) =>{
    const {title,url,cost} = req.body;
    const imageId = req.params.imgid;
    const updatedImage = {...Dummy_Images.find(i => i.id === imageId)};
    const imgIndex = Dummy_Images.findIndex(i => i.id === imageId);
    updatedImage.title = title;
    updatedImage.url = url;
    updatedImage.cost = cost;

    Dummy_Images[imgIndex] = updatedImage;
    res.status(200).json({image:updatedImage});

};
const deleteImage = (req,res,next) =>{
    const imageId = req.params.imgid;
    Dummy_Images = Dummy_Images.filter(p=> p.id!==imageId);
    res.status(200).json({message:'Deleted place'})

};

exports.getArtById = getArtById;
exports.getArtByUser = getArtByUser;
exports.saveArt = saveArt;
exports.updateImage = updateImage;
exports.deleteImage = deleteImage;