const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const saveimageSchema = new Schema({
    title:{type:String,required:true},
    description: { type: String, required: true },
    url:{type:String, required:true},
    address:{type:String,required:true},
    location:{
        lat:{type:Number, required:true},
        long:{type:Number, required:true}
    },
    author:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
    user1:{type:String,required:true},
    
  
})

module.exports = mongoose.model('Savedimage',saveimageSchema);