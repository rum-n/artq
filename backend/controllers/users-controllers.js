const HttpError = require('../models/http-error')
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
exports.getUserById = getUserById;
exports.getArtById = getArtById;