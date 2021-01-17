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
    price: { type: Number,default: 0},
    url:{type:String, required:true},
    address:{type:String,required:true},
    location:{
        lat:{type:Number},
        long:{type:Number}
    },
    type:{type:String, required:true},
    duration:{type:Number,default: 0},
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
    tusa:{type:Number,default:0},
    susa:{type:Number,default:0},
    tcanada:{type:Number,default:0},
    scanada:{type:Number,default:0},
    tmexico:{type:Number,default:0},
    smexico:{type:Number,default:0},
    teurope:{type:Number,default:0},
    seurope:{type:Number,default:0},
    tafrica:{type:Number,default:0},
    safrica:{type:Number,default:0},
    taustralia:{type:Number,default:0},
    saustralia:{type:Number,default:0},
    tchina:{type:Number,default:0},
    schina:{type:Number,default:0},
    tindia:{type:Number,default:0},
    sindia:{type:Number,default:0},
    totherasia:{type:Number,default:0},
    sotherasia:{type:Number,default:0},

})

module.exports = mongoose.model('Image',imageSchema);