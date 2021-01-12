const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{type: String, required: true},
    location:{type: String},
    about:{type: String},
    prof:{type: String},
    email:{type: String, required: true, unique:true},
    password:{type: String, required: true,minlength:6},
    phone:{type: Number,required: true},
    image:[{type:mongoose.Types.ObjectId,required:true,ref:"Image"}],
    savedimage:[{type:mongoose.Types.ObjectId,required:true,ref:"Savedimage"}],
    order:[{type:mongoose.Types.ObjectId,required:true,ref:"Order"}],
    history:{type: Array,default:[]},
    followers:{type: Array,default:[]},
    following:{type: Array,default:[]},
    followingnumber:{type: Number,default:0},
    followersnumber:{type: Number,default:0},
    
    bids:{type: Array,default:[]}

});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User',userSchema);