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
]
const HttpError = require('../models/http-error')
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
const getUserById = (req,res,next)=>{
    const userId = req.params.uid;
    const place = Dummy_Images.find(p=>{
        return p.author === userId;
    });
    if (!place){
        return next(
            new HttpError("Could not find a user for the provided user id",404)
        );
    }
    res.json({place})

}
exports.getArtById = getArtById;
exports.getUserById = getUserById;