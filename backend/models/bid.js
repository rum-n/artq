const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const bidSchema = new Schema({
    title:{type:String,required:true},
    artId:{type:String,required:true},
    description: { type: String, required: true },
    dimentions: { type: String, required: true },
    url:{type:String, required:true},
    address:{type:String,required:true},
    location:{
        lat:{type:Number, required:true},
        long:{type:Number, required:true}
    },
    type:{type:String, required:true},
    duration:{type:Number, required:true},
    bid:{type:Number, required:true},
    medium:{type:String, required:true},
    author:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
    user1:{type:String,required:true},
    status: {
        type: String,
        default: "In-progress",
        enum: ["In-progress", "You did not win", "You won the bid!"] // enum means string objects
      },
      
    
  
},{ timestamps: true })

module.exports = mongoose.model('Bid',bidSchema);