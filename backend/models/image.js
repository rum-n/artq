const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const imageSchema = new Schema({
    title:{type:String,required:true},
    description: { type: String, required: true },
    url:{type:String, required:true},
    address:{type:String,required:true},
    location:{
        lat:{type:Number, required:true},
        lat:{type:Number, required:true}
    },
    author:{type:mongoose.Types.ObjectId,required:true, ref:"User"}
})

module.exports = mongoose.model('Image',imageSchema);