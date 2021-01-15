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
        lat:{type:Number},
        long:{type:Number}
    },
    type:{type:String, required:true},
    duration:{type:Number},
    medium:{type:String, required:true},
    style:{type:String, required:true},
    author:{type:mongoose.Types.ObjectId,required:true,ref:"User"},
    likes: {
        type: Number,
        default: 0,
      },
    peoplewholiked: {
        type: String,
        default: "",
      },
    tusa:{type:Number},
    susa:{type:Number},
    tcanada:{type:Number},
    scanada:{type:Number},
    tmexico:{type:Number},
    smexico:{type:Number},
    teurope:{type:Number},
    seurope:{type:Number},
    tafrica:{type:Number},
    safrica:{type:Number},
    taustralia:{type:Number},
    saustralia:{type:Number},
    tchina:{type:Number},
    schina:{type:Number},
    tindia:{type:Number},
    sindia:{type:Number},
    totherasia:{type:Number},
    sotherasia:{type:Number},

})

module.exports = mongoose.model('Image',imageSchema);