const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    title:{type:String,required:true},
    status: {
        type: String,
        default: "Not sold",
        enum: ["Not sold", "sold"] // enum means string objects
      },
    description: { type: String, required: true },
    dimentions: { type: String, required: true },
    price: { type: Number},
    url:{type:String, required:true},
    address:{type:String,required:true},
    location:{
        lat:{type:Number, required:true},
        long:{type:Number, required:true}
    },
    type:{type:String, required:true},
    duration:{type:Number},
    medium:{type:String, required:true},
    author:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
    likes: {
        type: Number,
        default: 0,
      },
})

module.exports = mongoose.model('Image',imageSchema);