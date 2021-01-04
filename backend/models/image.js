const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    title:{type:String,required:true},
    description: { type: String, required: true },
    dimentions: { type: String, required: true },
    price: { type: Number, required: true },
    url:{type:String, required:true},
    address:{type:String,required:true},
    location:{
        lat:{type:Number, required:true},
        long:{type:Number, required:true}
    },
    type:{type:String, required:true},
    duration:{type:Number, required:true},
    medium:{type:String, required:true},
    author:{type:mongoose.Types.ObjectId,required:true,ref:"User"}
})

module.exports = mongoose.model('Image',imageSchema);