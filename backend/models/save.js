const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const saveimageSchema = new Schema({
    title:{type:String,required:true},
    description: { type: String, required: true },
    dimentions: { type: String, required: true },
    price: { type: String, required: true },
    url:{type:String, required:true},
    address:{type:String,required:true},
    location:{
        lat:{type:Number, required:true},
        long:{type:Number, required:true}
    },
    type:{type:String, required:true},
    duration:{type:Number, required:true},
    medium:{type:String, required:true},
    author:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
    user1:{type:String,required:true},
    
  
})

module.exports = mongoose.model('Savedimage',saveimageSchema);